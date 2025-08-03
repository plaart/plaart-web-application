// Tipo para manejar errores de forma type-safe
export type ErrorType = Error | { message: string } | string | unknown;

// Función helper para extraer mensaje de error de forma segura
export const getErrorMessage = (error: ErrorType): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }
  if (typeof error === "string") {
    return error;
  }
  return "Error desconocido";
};

// workspace
export type Folder = {
  id: number;
  name: string;
  fileCount: number;
};
