/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tool, type EditorObjectLayer } from "../../types/editor";
import type { KonvaRenderData } from "./types";


export class LayerKonvaMapper {

  static toKonvaData(layer: EditorObjectLayer): KonvaRenderData | null {
    if (!layer.id || !layer.drawLine?.tool) return null;

    const transform = layer.transform || {};
    const style = layer.style || {};
    const state = layer.state || {};

    const baseData: Partial<KonvaRenderData> = {
      id: layer.id,
      visible: state.isVisible !== false,
      layer,
      x: transform.posX || 0,
      y: transform.posY || 0,
      fill: style.fill || 'transparent',
      stroke: style.color || '#000000',
      strokeWidth: style.strokeWidth || 2,
      opacity: 1,
      rotation: transform.rotation || 0,
      scaleX: transform.scaleX || 1,
      scaleY: transform.scaleY || 1,
      draggable: state.draggable !== false,
      listening: true
    };

    switch (layer.drawLine.tool) {
      case Tool.BRUSH:
      case Tool.ERASER:
      case Tool.LINE:
        return {
          ...baseData as KonvaRenderData,
          type: 'line',
          points: layer.drawLine.lines || [],
          globalCompositeOperation: layer.drawLine.tool === Tool.ERASER ? 'destination-out' : 'source-over'
        };
      case Tool.CIRCLE:
        return { ...baseData as KonvaRenderData, type: 'circle', radius: transform.radius || 30 };
      case Tool.RECTANGLE:
        return { ...baseData as KonvaRenderData, type: 'rect', width: transform.width || 100, height: transform.height || 60 };
      case Tool.TEXT:
        return { ...baseData as KonvaRenderData, type: 'text', text: 'Texto', fontSize: 16, fill: style.color || '#000000' };
      default:
        return null;
    }
  }

  static updateLayerFromKonva(layer: EditorObjectLayer, _konvaChanges: Partial<KonvaRenderData>): EditorObjectLayer {
    const updatedLayer: EditorObjectLayer = { ...layer };
    // ...igual que antes, se puede mantener
    return updatedLayer;
  }
}
