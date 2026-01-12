import { RiLoader4Line } from "@remixicon/react";

interface LoadingStateProps {
  isEditorLoading: boolean;
  message?: string;
}

export const LoadingState = ({
  isEditorLoading,
  message,
}: LoadingStateProps) => (
  <div className="flex-1 bg-gray-100 flex items-center justify-center p-8 h-[825px] rounded-2xl">
    <div className="text-center">
      <RiLoader4Line
        className="mx-auto mb-3 text-blue-600 animate-spin"
        size={48}
      />
      <p className="text-gray-600 font-medium text-sm">
        {message || "Cargando editor..."}
      </p>
      <p className="text-gray-500 text-xs mt-1">
        {isEditorLoading ? "Conectando con el servidor" : "Guardando cambios"}
      </p>
    </div>
  </div>
);
