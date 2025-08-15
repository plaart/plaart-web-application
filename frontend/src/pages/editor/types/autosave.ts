export interface AutoSaveConfig {
  minInterval: number; // Mínimo tiempo entre guardados
  maxInterval: number; // Máximo tiempo sin guardar
  changeThreshold: number; // Número mínimo de cambios para trigger
  adaptiveMode: boolean; // Ajustar intervalo según actividad
}

export interface AutoSaveMetrics {
  totalSaves: number;
  failedSaves: number;
  avgSaveTime: number;
  lastSaveTime: Date | null;
  adaptedInterval: number;
}
