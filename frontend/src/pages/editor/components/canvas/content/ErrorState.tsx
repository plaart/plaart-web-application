interface ErrorStateProps {
  error: Error | null;
  onRetry?: () => void;
}

export const ErrorState = ({ error, onRetry }: ErrorStateProps) => (
  <div className="flex-1 bg-gray-100 flex items-center justify-center p-8 h-[825px] rounded-2xl">
    <div className="text-center">
      <p className="text-red-600 font-medium text-sm mb-2">
        Error al cargar el editor
      </p>
      <p className="text-gray-500 text-xs mb-4">
        {error?.message || "Error desconocido"}
      </p>
      <button
        onClick={onRetry || (() => window.location.reload())}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
        Reintentar
      </button>
    </div>
  </div>
);
