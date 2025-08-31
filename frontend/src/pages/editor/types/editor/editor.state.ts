import type { CanvasShape } from "./editor.dto";
import type { ToolType } from "./editor.enums";
import type {
  Dimension,
  DrawLine,
  Point,
} from "./editor.interface";

export interface EditorState {
  currentTool: ToolType;
  drawColor: string;
  drawWidth: number;
  //* Drawing state
  lines: DrawLine[];
  aiPointsSelection: Point[];
  annotationsToDraw: CanvasShape[];
  selectedShapeDrawId: number;
  //* Canvas state
  zoom: number;
  dimension: Dimension;
}

export type EditorAction =
  | { type: "SET_CURRENT_TOOL"; payload: ToolType }
  | { type: "SET_DRAW_COLOR"; payload: string }
  | { type: "SET_DRAW_WIDTH"; payload: number }
  | {
      type: "SET_LINES";
      payload: DrawLine[] | ((prev: DrawLine[]) => DrawLine[]);
    }
  | {
      type: "SET_AI_POINTS_SELECTION";
      payload: Point[] | ((prev: Point[]) => Point[]);
    }
  | {
      type: "SET_ANNOTATIONS_TO_DRAW";
      payload: CanvasShape[] | ((prev: CanvasShape[]) => CanvasShape[]);
    }
  | { type: "SET_SELECTED_SHAPE_DRAW_ID"; payload: number }
  | { type: "SET_ZOOM"; payload: number }
  | {
      type: "SET_CANVAS_DIMENSIONS";
      payload: { width: number; height: number };
    }
  | { type: "SET_SELECTED_LAYER_ID"; payload: string | null }
  | { type: "CLEAR_CANVAS" };
