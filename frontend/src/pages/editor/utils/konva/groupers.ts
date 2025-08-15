import { Tool, type EditorObjectLayer } from "../../types/editor";

export const groupLayersByType = (layers: EditorObjectLayer[]) => {
  const groups: {
    lines: EditorObjectLayer[];
    shapes: EditorObjectLayer[];
    texts: EditorObjectLayer[];
    images: EditorObjectLayer[];
  } = { lines: [], shapes: [], texts: [], images: [] };

  layers.forEach((layer) => {
    if (!layer.drawLine?.tool) return;

    switch (layer.drawLine.tool) {
      case Tool.BRUSH:
      case Tool.ERASER:
      case Tool.LINE:
        groups.lines.push(layer);
        break;
      case Tool.CIRCLE:
      case Tool.RECTANGLE:
        groups.shapes.push(layer);
        break;
      case Tool.TEXT:
        groups.texts.push(layer);
        break;
      default:
        if (layer.hasImageContent) groups.images.push(layer);
    }
  });

  return groups;
};
