interface StatusBarProps {
  isSyncing: boolean;
  hasUnsavedChanges: boolean;
  layerCount: number;
  currentTool: string;
  selectedLayerId: string | null;
}

const StatusBar = ({
  isSyncing,
  hasUnsavedChanges,
  layerCount,
  currentTool,
  selectedLayerId,
}: StatusBarProps) => {
  return (
    <div className="absolute top-2 left-2 z-10 bg-black/70 text-white px-3 py-1 rounded text-xs">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1">
          <span
            className={`w-2 h-2 rounded-full ${
              isSyncing
                ? "bg-yellow-400"
                : hasUnsavedChanges
                ? "bg-orange-400"
                : "bg-green-400"
            }`}
          />
          {isSyncing
            ? "Guardando..."
            : hasUnsavedChanges
            ? "Cambios pendientes"
            : "Sincronizado"}
        </span>
        <span>Capas: {layerCount}</span>
        <span>Herramienta: {currentTool}</span>
        {selectedLayerId && (
          <span>Seleccionada: {selectedLayerId.slice(-8)}</span>
        )}
      </div>
    </div>
  );
};

export default StatusBar;
