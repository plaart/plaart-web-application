import { Tool, type EditorObjectLayer } from "../../types/editor";
import { canRenderLayer } from "./validators";

export const calculateBounds = (layers: EditorObjectLayer[]) => {
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;

  layers.forEach((layer) => {
    if (!canRenderLayer(layer)) return;

    const transform = layer.transform || {};
    const x = transform.posX || 0;
    const y = transform.posY || 0;

    switch (layer.drawLine?.tool) {
      case Tool.BRUSH:
      case Tool.ERASER:
      case Tool.LINE: {
        const points = layer.drawLine.lines || [];
        for (let i = 0; i < points.length; i += 2) {
          minX = Math.min(minX, points[i]);
          maxX = Math.max(maxX, points[i]);
          minY = Math.min(minY, points[i + 1]);
          maxY = Math.max(maxY, points[i + 1]);
        }
        break;
      }
      case Tool.CIRCLE: {
        const r = transform.radius || 0;
        minX = Math.min(minX, x - r);
        maxX = Math.max(maxX, x + r);
        minY = Math.min(minY, y - r);
        maxY = Math.max(maxY, y + r);
        break;
      }
      case Tool.RECTANGLE: {
        const w = transform.width || 0;
        const h = transform.height || 0;
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x + w);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y + h);
        break;
      }
    }
  });

  return {
    minX: minX === Infinity ? 0 : minX,
    minY: minY === Infinity ? 0 : minY,
    maxX: maxX === -Infinity ? 800 : maxX,
    maxY: maxY === -Infinity ? 600 : maxY,
  };
};
