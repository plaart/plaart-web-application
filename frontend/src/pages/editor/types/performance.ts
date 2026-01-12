import type Konva from "konva";

export interface PerformanceMetrics {
  fps: number;
  renderTime: number;
  objectCount: number;
  memoryUsage: number;
  lastOptimization: Date | null;
}

export interface PerformanceWithMemory extends Performance {
  memory: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
}

export interface StageExtra extends Konva.Stage {
  perfectDrawEnabled(enabled: boolean): this;
  hitGraphEnabled(enabled: boolean): this;
}
