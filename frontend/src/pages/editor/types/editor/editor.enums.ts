export const Tool = {
  PEN: "pen",
  BRUSH: "brush",
  ERASER: "eraser",
  LINE: "line",
  RECTANGLE: "rectangle",
  CIRCLE: "circle",
  TEXT: "text",
  SELECT: "select",
  MOVE: "move",
  AI: "ai",
} as const;

// TODO: A REVISAR - export type ToolType = 'pen' | 'eraser' | 'ai' | 'rect' | 'circle';
export const VisualMode = {
  NORMAL: "NORMAL",
  DARK: "DARK",
  HIGH_CONTRAST: "HIGH_CONTRAST",
} as const;

export type ToolType = typeof Tool[keyof typeof Tool];
export type VisualModeType = typeof VisualMode[keyof typeof VisualMode];
