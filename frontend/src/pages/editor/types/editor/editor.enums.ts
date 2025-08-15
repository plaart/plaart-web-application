export const Tool = {
  BRUSH: "BRUSH",
  ERASER: "ERASER",
  LINE: "LINE",
  RECTANGLE: "RECTANGLE",
  CIRCLE: "CIRCLE",
  TEXT: "TEXT",
  SELECT: "SELECT",
  MOVE: "MOVE",
} as const;

export const VisualMode = {
  NORMAL: "NORMAL",
  DARK: "DARK",
  HIGH_CONTRAST: "HIGH_CONTRAST",
} as const;

export type ToolType = typeof Tool[keyof typeof Tool];
export type VisualModeType = typeof VisualMode[keyof typeof VisualMode];
