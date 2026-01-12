import type { ToolType } from "./editor.enums";
import type {
  Dimension,
  DrawLine,
  Editor,
  EditorMetaData,
  EditorObjectLayer,
  EditorScreenInfo,
} from "./editor.interface";

export interface RequestEditor {
  projectId: string;
  userId: string;
}

export interface UpdateEditorInput {
  projectId: string;
  userId: string;
  objectLayers?: EditorObjectLayer[];
  objectLayerSelected?: EditorObjectLayer;
  activeDrawLine?: DrawLine;
  editorDimension?: Dimension;
  screenInfo?: EditorScreenInfo;
  editorMetadata?: EditorMetaData;
}

export interface EditorStats {
  totalLayers?: number;
  visibleLayers?: number;
  layersWithImages?: number;
  layersWithDrawing?: number;
  totalImageSize?: number;
  totalDrawingPoints?: number;
  zoomLevel?: number;
  visualMode?: string;
  hasComplexLayers?: boolean;
  averageLayerComplexity?: number;
}

export interface EditorResponse {
  success?: boolean;
  message?: string;
  errorCode?: string;
  timestamp?: string;
  operation?: string;
  executionTimeMs?: number;
  warnings?: string[];
  hasUnsavedChanges?: boolean;
  editor?: Editor;
  stats?: EditorStats;
}

export interface CanvasShape {
  id: number;
  tool: ToolType;
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
  points?: number[];
}
