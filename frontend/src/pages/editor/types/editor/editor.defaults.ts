import type { Brush } from "./editor.interface";
import type { CanvasSettings } from "./editor.ui";

export interface AutoSaveConfig {
  enabled: boolean;
  intervalMs: number;
  maxPendingChanges: number;
  retryAttempts: number;
}

export const DEFAULT_CANVAS_SETTINGS: CanvasSettings = {
  width: 800,
  height: 600,
  backgroundColor: "#ffffff",
  zoom: 1,
  offsetX: 0,
  offsetY: 0,
  getContextAttributes: () => ({
    alpha: true,
    depth: true,
    stencil: false,
    antialias: true,
    premultipliedAlpha: false,
    preserveDrawingBuffer: false,
    powerPreference: "high-performance",
  }),
};

export const DEFAULT_BRUSH_SETTINGS: Brush = {
  color: "#000000",
  size: 5,
  fill: "#000000",
};

export const DEFAULT_AUTOSAVE_CONFIG: AutoSaveConfig = {
  enabled: true,
  intervalMs: 5000,
  maxPendingChanges: 10,
  retryAttempts: 3,
};
