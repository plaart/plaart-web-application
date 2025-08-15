import { type ToolType, type VisualModeType } from "./editor.enums";

// Interfaces que coinciden exactamente con GraphQL Schema
export interface Brush {
  color?: string;
  fill?: string;
  size?: number;
}

export interface DrawLine {
  tool: ToolType;
  lines?: number[];
  brush?: Brush;
}

export interface Transform {
  posX?: number;
  posY?: number;
  width?: number;
  height?: number;
  radius?: number;
  rotation?: number;
  scaleX?: number;
  scaleY?: number;
  points?: number[];
}

export interface State {
  objectLayerSelectedId?: string;
  draggable?: boolean;
  isSelected?: boolean;
  isVisible?: boolean;
}

export interface Style {
  tool?: string;
  fill?: string;
  color?: string;
  stroke?: number;
  strokeWidth?: number;
  zIndex?: number;
}

export interface ImageContent {
  image?: string;
  src?: string;
  loading?: boolean;
}

export interface EditorMetaData {
  createdAt?: string;
  updatedAt?: string;
}

export interface EditorObjectLayer {
  id?: string;
  transform?: Transform;
  state?: State;
  style?: Style;
  drawLine?: DrawLine;
  hasImageContent?: boolean;
  imageContent?: ImageContent;
  objectMetadata?: EditorMetaData;
}

export interface EditorScreenInfo {
  zoom?: number;
  visualMode?: VisualModeType;
  status?: boolean;
}

export interface Dimension {
  width?: number;
  height?: number;
}

export interface Editor {
  id?: string;
  userId?: string;
  projectId?: string;
  objectLayers?: EditorObjectLayer[];
  objectLayerSelected?: EditorObjectLayer;
  activeDrawLine?: DrawLine;
  editorDimension?: Dimension;
  screenInfo?: EditorScreenInfo;
  editorMetadata?: EditorMetaData;
}

export interface LayerComponentProps {
  layers: EditorObjectLayer[];
  onLayerChange: (layerId: string, changes: Partial<EditorObjectLayer>) => void;
  onLayerSelect: (layerId: string) => void;
  selectedLayerId: string | null;
}
