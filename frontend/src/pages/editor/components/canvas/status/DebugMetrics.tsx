interface DebugMetricsProps {
  metrics: { fps: number };
  debugInfo: {
    serverLayers: number;
    pendingChanges: number;
    lastSync: string;
  };
}
const DebugMetrics = ({ metrics, debugInfo }: DebugMetricsProps) => {
  return (
    <div className="absolute top-2 right-2 z-10 bg-black/70 text-white px-3 py-1 rounded text-xs">
      <h3>Debug Metrics</h3>
      <p>FPS: {metrics.fps}</p>
      <h4>Debug Info</h4>
      <p>Server Layers: {debugInfo.serverLayers}</p>
      <p>Pending Changes: {debugInfo.pendingChanges}</p>
      <p>Last Sync: {debugInfo.lastSync}</p>
    </div>
  );
};

export default DebugMetrics;
