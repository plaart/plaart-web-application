import { DRAW_TOOLS, SELECTION_TOOLS, SHAPE_TOOLS } from "./editor.constants";
import type { ToolType } from "./editor.enums";

export const isShapeTool = (tool: ToolType): boolean =>
  SHAPE_TOOLS.includes(tool);

export const isDrawTool = (tool: ToolType): boolean =>
  DRAW_TOOLS.includes(tool);

export const isSelectionTool = (tool: ToolType): boolean =>
  SELECTION_TOOLS.includes(tool);

export const generateLayerId = (): string => {
  return `layer_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};
