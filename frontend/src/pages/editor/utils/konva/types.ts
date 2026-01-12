import type { EditorObjectLayer } from "../../types/editor";

export interface KonvaRenderData {
  id: string;
  type: "line" | "circle" | "rect" | "text" | "image";
  visible: boolean;
  layer: EditorObjectLayer;
  x: number;
  y: number;
  points?: number[];
  radius?: number;
  width?: number;
  height?: number;
  text?: string;
  fontSize?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  rotation?: number;
  scaleX?: number;
  scaleY?: number;
  draggable?: boolean;
  listening?: boolean;
  globalCompositeOperation?: "source-over" | "destination-out";
}
