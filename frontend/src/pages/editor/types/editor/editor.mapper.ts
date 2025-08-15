/* eslint-disable @typescript-eslint/no-explicit-any */
import type { EditorObjectLayer } from "./editor.interface";
import type { KonvaNodeData } from "./editor.ui";

export interface LayerMapper {
  toKonvaNode: (layer: EditorObjectLayer) => KonvaNodeData | null;
  fromKonvaToLayer: (
    nodeData: KonvaNodeData,
    changes: any
  ) => EditorObjectLayer;
}
