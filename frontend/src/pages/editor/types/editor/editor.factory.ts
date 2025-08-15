import type { EditorObjectLayer } from "./editor.interface";
import { Tool, type ToolType } from "./editor.enums";
import { generateLayerId } from "./editor.helper";
import { DEFAULT_BRUSH_SETTINGS } from "./editor.defaults";

export const createEmptyLayer = (
  tool: ToolType,
  position: { x: number; y: number }
): EditorObjectLayer => {
  const id = generateLayerId();

  const baseLayer: EditorObjectLayer = {
    id,
    transform: {
      posX: position.x,
      posY: position.y,
      scaleX: 1,
      scaleY: 1,
      rotation: 0,
    },
    state: {
      isVisible: true,
      draggable: true,
      isSelected: false,
    },
    style: {
      color: "#000000",
      strokeWidth: 2,
      fill: "transparent",
      zIndex: 1,
    },
    drawLine: {
      tool,
      lines: [],
      brush: DEFAULT_BRUSH_SETTINGS,
    },
    hasImageContent: false,
  };

  switch (tool) {
    case Tool.RECTANGLE:
      baseLayer.transform!.width = 100;
      baseLayer.transform!.height = 60;
      break;

    case Tool.CIRCLE:
      baseLayer.transform!.radius = 30;
      break;

    case Tool.TEXT:
      baseLayer.style!.fill = "#000000";
      break;

    case Tool.BRUSH:
    case Tool.ERASER:
    case Tool.LINE:
      baseLayer.drawLine!.lines = [position.x, position.y];
      break;
  }

  return baseLayer;
};
