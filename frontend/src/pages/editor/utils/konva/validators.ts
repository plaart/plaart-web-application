import { Tool, type EditorObjectLayer } from "../../types/editor";

export const canRenderLayer = (layer: EditorObjectLayer): boolean => {
  if (!layer.id || !layer.drawLine?.tool) return false;
  if (layer.state?.isVisible === false) return false;

  switch (layer.drawLine.tool) {
    case Tool.BRUSH:
    case Tool.ERASER:
    case Tool.LINE:
      return (
        Array.isArray(layer.drawLine.lines) && layer.drawLine.lines.length >= 4
      );
    case Tool.CIRCLE:
      return !!layer.transform?.radius && layer.transform.radius > 0;
    case Tool.RECTANGLE:
      return (
        !!layer.transform?.width &&
        !!layer.transform?.height &&
        layer.transform.width > 0 &&
        layer.transform.height > 0
      );
    case Tool.TEXT:
      return true;
    default:
      return false;
  }
};
