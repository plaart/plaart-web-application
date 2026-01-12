// hooks/useEditorGraphQL.ts
import { useQuery, useMutation } from "@apollo/client";
import { GET_EDITOR, CREATE_EDITOR, UPDATE_EDITOR } from "../graphql/queries";
import type { RequestEditor, UpdateEditorInput } from "../types/editor";

export const useEditorGraphQL = (projectId: string, userId: string) => {
  // Query para obtener el editor
  const queryResult = useQuery(GET_EDITOR, {
    variables: {
      input: { projectId, userId } satisfies RequestEditor,
    },
    skip: !projectId || !userId,
    errorPolicy: "all",
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });

  // Mutation para crear editor
  const [createEditorMutation, { loading: createLoading }] = useMutation(
    CREATE_EDITOR,
    { errorPolicy: "all" }
  );

  // Mutation para actualizar editor
  const [updateEditorMutation, { loading: updateLoading }] = useMutation(
    UPDATE_EDITOR,
    { errorPolicy: "all" }
  );

  // Función para crear editor en el server
  const createEditorOnServer = async () => {
    try {
      const result = await createEditorMutation({
        variables: { input: { projectId, userId } satisfies RequestEditor },
      });
      return result.data?.createEditor;
    } catch (error) {
      console.error("Error creating editor:", error);
      throw error;
    }
  };

  // Función para actualizar editor en el server
  const updateEditorOnServer = async (input: UpdateEditorInput) => {
    try {
      // Sanitizar el input: redondear solo campos que el schema suele esperar como Int
      const intKeys = new Set<string>([
        "posX",
        "posY",
        "width",
        "height",
        "radius",
        "rotation",
        "scaleX",
        "scaleY",
        "zIndex",
        "stroke",
        "strokeWidth",
        "size",
        "zoom",
        "lines",
        "points",
      ]);

      const sanitizeForGraphQL = (value: unknown, path = ""): unknown => {
        if (value === null || value === undefined) return value;

        // Extraer clave base (por ejemplo 'objectLayers[0].id' -> 'id')
        const rawKey = path.split(".").pop() || path;
        const key = String(rawKey).replace(/\[.*$/, "");

        // Strings: special handling for id fields
        if (typeof value === "string") {
          if (key === "id") {
            const n = Number(value);
            if (!Number.isNaN(n)) return Math.round(n);
            // Omitir ids no numéricos para evitar fallos de binding
            return undefined;
          }
          return value;
        }

        // Numbers: handle zoom specially, otherwise round keys in whitelist
        if (typeof value === "number") {
          // Special handling for zoom: backend expects percentage between 10 and 500
          if (key === "zoom") {
            let z = value;
            // if zoom is given as fraction (e.g. 1 -> 100), convert
            if (z > 0 && z <= 10) {
              z = z * 100;
            }
            z = Math.round(z);
            if (z < 10) z = 10;
            if (z > 500) z = 500;
            if (z !== value)
              console.warn(`Normalized zoom at ${path}: ${value} -> ${z}`);
            return z;
          }

          if (intKeys.has(key)) {
            if (!Number.isInteger(value)) {
              console.warn(
                `Sanitizing numeric value at ${path}: ${value} -> ${Math.round(
                  value
                )}`
              );
              return Math.round(value);
            }
          }
          return value;
        }

        // Arrays
        if (Array.isArray(value)) {
          return value
            .map((v, i) => sanitizeForGraphQL(v, `${path}[${i}]`))
            .filter((v) => v !== undefined);
        }

        // Objects: recursively sanitize and skip undefined properties
        if (typeof value === "object") {
          const out: Record<string, unknown> = {};
          for (const k of Object.keys(value as Record<string, unknown>)) {
            const sanitized = sanitizeForGraphQL(
              (value as Record<string, unknown>)[k],
              path ? `${path}.${k}` : k
            );
            if (sanitized !== undefined) {
              out[k] = sanitized;
            }
          }
          return out;
        }

        return value;
      };

      const sanitizedInput = sanitizeForGraphQL(input) as UpdateEditorInput;

      // Log sanitizado (intentar stringify para inspección; caer si hay ciclos)
      try {
        console.debug(
          "updateEditorOnServer - sanitizedInput:",
          JSON.stringify(sanitizedInput)
        );
      } catch (err) {
        console.debug(
          "updateEditorOnServer - sanitizedInput (unstringifiable)",
          sanitizedInput,
          err
        );
      }

      const result = await updateEditorMutation({
        variables: { input: sanitizedInput },
      });

      // Si el backend responde con success=false, loggear para depuración
      if (
        result?.data?.updateEditor &&
        result.data.updateEditor.success === false
      ) {
        console.error(
          "updateEditorOnServer - server returned failure:",
          result.data.updateEditor
        );
      }

      return result.data?.updateEditor;
    } catch (error) {
      // Mejor logging para Apollo errors
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const e: any = error;
      if (e && e.graphQLErrors) {
        console.error("GraphQL errors:", e.graphQLErrors);
      }
      if (e && e.networkError) {
        console.error("Network error:", e.networkError);
      }
      console.error("Error updating editor (raw):", e?.message || e);
      throw error;
    }
  };

  return {
    data: queryResult.data,
    loading: queryResult.loading || createLoading || updateLoading,
    // If the server returned only GraphQL non-null ID violations for
    // getEditor.objectLayers but also returned a usable editor payload,
    // treat the query as successful (suppress the error) so the UI does
    // not show the "Error cargando el editor" modal. We still log the
    // situation for diagnostics.
    error: (() => {
      const rawError = queryResult.error;
      try {
        if (
          rawError &&
          rawError.graphQLErrors &&
          Array.isArray(rawError.graphQLErrors) &&
          queryResult.data?.getEditor?.editor
        ) {
          const onlyNonNullIdErrors = rawError.graphQLErrors.every((e) => {
            const msg = String(e.message || "");
            const p = String(e.path || "");
            return (
              msg.includes("was declared as a non null type") &&
              p.includes("getEditor") &&
              p.includes("objectLayers")
            );
          });
          if (onlyNonNullIdErrors) {
            console.debug(
              "Suppressed GraphQL non-null ID errors for getEditor.objectLayers; using returned data."
            );
            return undefined;
          }
        }
      } catch (e) {
        // If anything goes wrong while inspecting the error, fall back to
        // returning the original error so we don't hide real problems.
        console.warn(
          "Error while evaluating GraphQL errors for suppression:",
          e
        );
      }

      return rawError;
    })(),
    refetch: queryResult.refetch,
    createEditorOnServer,
    updateEditorOnServer,
  };
};
