import type { EditorObjectLayer } from "./editor.interface";

export interface CursorPosition {
  x: number;
  y: number;
}

export interface CanvasSettings {
  width: number;
  height: number;
  backgroundColor: string;
  zoom: number;
  offsetX: number;
  offsetY: number;
  getContextAttributes?: () => WebGLContextAttributes;
}

export interface KonvaNodeData {
  id: string;
  type: "line" | "circle" | "rect" | "text";
  visible: boolean;
  layer: EditorObjectLayer;
}
