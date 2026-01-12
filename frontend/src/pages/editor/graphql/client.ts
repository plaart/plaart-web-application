/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import toast from "react-hot-toast";

// Obtener URLs de las variables de entorno
const GRAPHQL_URL =
  import.meta.env.VITE_GRAPHQL_URL || "http://localhost:8093/graphql";
const AUTH_TOKEN_KEY = import.meta.env.VITE_AUTH_TOKEN_KEY || "accessToken";

// Link para HTTP
const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
  credentials: "include",
});

// Link para autenticación (token opcional)
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  };
});

// Link para manejo de errores global
const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        const nonNullTypeViolation =
          typeof message === "string" &&
          message.includes("was declared as a non null type");

        if (
          nonNullTypeViolation &&
          (String(path).includes("getEditor") ||
            String(path).includes("updateEditor")) &&
          String(path).includes("objectLayers")
        ) {
          console.debug(
            `GraphQL non-null violation (suppressed): Message: ${message}, Path: ${path}`
          );
        } else {
          console.error(
            `GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`
          );

          if (!message.toLowerCase().includes("not found")) {
            toast.error(`Error: ${message}`);
          }
        }
      });
    }

    if (networkError) {
      console.error(`Network error: ${networkError}`);

      if (
        (networkError as any).message &&
        (networkError as any).message.includes("fetch")
      ) {
        toast.error(
          "Error de conexión. Verifica que el servidor esté ejecutándose."
        );
      } else {
        toast.error("Error de conexión. Verifica tu conexión a internet.");
      }

      if (
        (networkError as any).message &&
        (networkError as any).message.includes("Failed to fetch")
      ) {
        return forward(operation);
      }
    }
  }
);

// Política de cache personalizada
const cache = new InMemoryCache({
  typePolicies: {
    Editor: {
      keyFields: ["id"],
      fields: {
        objectLayers: {
          merge(_existing = [], incoming: unknown[]) {
            return incoming;
          },
        },
        history: {
          merge(_existing = [], incoming: unknown[]) {
            return incoming;
          },
        },
      },
    },
    EditorResponse: {
      fields: {
        editor: {
          merge(_existing, incoming) {
            return incoming;
          },
        },
        stats: {
          merge(_existing, incoming) {
            return incoming;
          },
        },
        warnings: {
          merge(_existing = [], incoming: string[] = []) {
            return incoming;
          },
        },
      },
    },
    EditorObjectLayer: {
      keyFields: ["id"],
      fields: {
        transform: {
          merge(existing, incoming) {
            return { ...existing, ...incoming };
          },
        },
        state: {
          merge(existing, incoming) {
            return { ...existing, ...incoming };
          },
        },
        style: {
          merge(existing, incoming) {
            return { ...existing, ...incoming };
          },
        },
      },
    },
  },
});

// Link to sanitize responses: remove editor objectLayers with null ids coming
// from the server so the client code can remain stable while backend is fixed.
const responseSanitizer = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    try {
      // target GetEditor and UpdateEditor responses defensively
      const editorRoot =
        response?.data?.getEditor?.editor ||
        response?.data?.updateEditor?.editor;
      if (
        (operation.operationName === "GetEditor" ||
          operation.operationName === "UpdateEditor") &&
        editorRoot
      ) {
        const editorUnknown = editorRoot as unknown;
        if (typeof editorUnknown === "object" && editorUnknown !== null) {
          const editorObj = editorUnknown as Record<string, unknown>;
          const ol = editorObj.objectLayers;
          if (Array.isArray(ol)) {
            // filter out nullish entries and entries whose id is nullish
            editorObj.objectLayers = ol.filter((entry) => {
              if (entry == null || typeof entry !== "object") return false;
              const id = (entry as Record<string, unknown>).id;
              return id != null;
            });
          }

          const selected = editorObj.objectLayerSelected;
          if (
            selected == null ||
            (selected as Record<string, unknown>).id == null
          ) {
            // remove the property entirely to avoid Apollo trying to write an
            // undefined field into the cache (which causes store writer errors)
            delete editorObj.objectLayerSelected;
          }

          // write back sanitized object to whichever root existed
          if (response?.data?.getEditor?.editor) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            response.data.getEditor.editor = editorObj as any;
          }
          if (response?.data?.updateEditor?.editor) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            response.data.updateEditor.editor = editorObj as any;
          }
        }
      }
    } catch (e) {
      // Never let the sanitizer throw and break the link chain
      console.warn("responseSanitizer failed:", e);
    }
    return response;
  });
});

const link = from([errorLink, responseSanitizer, authLink, httpLink]);

// Cliente Apollo
export const apolloClient = new ApolloClient({
  uri: GRAPHQL_URL,
  link,
  cache,
  connectToDevTools: import.meta.env.DEV,
  defaultOptions: {
    watchQuery: {
      errorPolicy: "all",
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "cache-and-network",
    },
    query: {
      errorPolicy: "all",
      fetchPolicy: "cache-first",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});

// Función para limpiar cache
export const clearApolloCache = () => {
  apolloClient.clearStore();
};

// Función para obtener el estado de conexión
export const getConnectionStatus = () => {
  return navigator.onLine;
};

// Función para reiniciar cliente en caso de error crítico
export const resetApolloClient = () => {
  apolloClient.resetStore();
};
