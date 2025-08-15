import type { EditorObjectLayer } from "../../types/editor";


export const getLayerZIndex = (layer: EditorObjectLayer) => layer.style?.zIndex || 0;

export const sortLayersByZIndex = (layers: EditorObjectLayer[]) =>
  [...layers].sort((a, b) => getLayerZIndex(a) - getLayerZIndex(b));
