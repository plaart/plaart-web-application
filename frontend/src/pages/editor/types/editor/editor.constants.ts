import { Tool, type ToolType } from './editor.enums';

export const SHAPE_TOOLS: readonly ToolType[] = [
  Tool.RECTANGLE,
  Tool.CIRCLE
];

export const DRAW_TOOLS: readonly ToolType[] = [
  Tool.BRUSH,
  Tool.ERASER,
  Tool.LINE
];

export const SELECTION_TOOLS: readonly ToolType[] = [
  Tool.SELECT,
  Tool.MOVE
];
