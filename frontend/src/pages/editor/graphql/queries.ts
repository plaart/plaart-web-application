// graphql/queries.ts - Queries actualizadas que coinciden con el backend
import { gql } from "@apollo/client";
import type {
  Editor,
  EditorObjectLayer,
  ToolType,
  VisualModeType,
} from "../types/editor";

// Fragment para EditorObjectLayer
const EDITOR_OBJECT_LAYER_FRAGMENT = gql`
  fragment EditorObjectLayerFragment on EditorObjectLayer {
    id
    transform {
      posX
      posY
      width
      height
      radius
      rotation
      scaleX
      scaleY
      points
    }
    state {
      objectLayerSelectedId
      draggable
      isSelected
      isVisible
    }
    style {
      tool
      fill
      color
      stroke
      strokeWidth
      zIndex
    }
    drawLine {
      tool
      lines
      brush {
        color
        fill
        size
      }
    }
    hasImageContent
    imageContent {
      image
      src
      loading
    }
    objectMetadata {
      createdAt
      updatedAt
    }
  }
`;

// Fragment para Editor completo
const EDITOR_FRAGMENT = gql`
  fragment EditorFragment on Editor {
    id
    userId
    projectId
    objectLayers {
      ...EditorObjectLayerFragment
    }
    objectLayerSelected {
      ...EditorObjectLayerFragment
    }
    activeDrawLine {
      tool
      lines
      brush {
        color
        fill
        size
      }
    }
    editorDimension {
      width
      height
    }
    screenInfo {
      zoom
      visualMode
      status
    }
    editorMetadata {
      createdAt
      updatedAt
    }
  }
  ${EDITOR_OBJECT_LAYER_FRAGMENT}
`;

// Fragment para EditorResponse
const EDITOR_RESPONSE_FRAGMENT = gql`
  fragment EditorResponseFragment on EditorResponse {
    success
    message
    errorCode
    timestamp
    operation
    executionTimeMs
    warnings
    hasUnsavedChanges
    editor {
      ...EditorFragment
    }
    stats {
      totalLayers
      visibleLayers
      layersWithImages
      layersWithDrawing
      totalImageSize
      totalDrawingPoints
      zoomLevel
      visualMode
      hasComplexLayers
      averageLayerComplexity
    }
  }
  ${EDITOR_FRAGMENT}
`;

// Query para obtener editor
export const GET_EDITOR = gql`
  query GetEditor($input: RequestEditor!) {
    getEditor(input: $input) {
      ...EditorResponseFragment
    }
  }
  ${EDITOR_RESPONSE_FRAGMENT}
`;

// Query para verificar si existe editor
export const EDITOR_EXISTS = gql`
  query EditorExists($projectId: String!) {
    editorExists(projectId: $projectId)
  }
`;

// Query para obtener estadísticas del editor
export const GET_EDITOR_STATS = gql`
  query GetEditorStats($input: RequestEditor!) {
    getEditorStats(input: $input) {
      totalLayers
      visibleLayers
      layersWithImages
      layersWithDrawing
      totalImageSize
      totalDrawingPoints
      zoomLevel
      visualMode
      hasComplexLayers
      averageLayerComplexity
    }
  }
`;

// Mutation para crear editor
export const CREATE_EDITOR = gql`
  mutation CreateEditor($input: RequestEditor!) {
    createEditor(input: $input) {
      ...EditorResponseFragment
    }
  }
  ${EDITOR_RESPONSE_FRAGMENT}
`;

// Mutation para actualizar editor
export const UPDATE_EDITOR = gql`
  mutation UpdateEditor($input: UpdateEditorInput!) {
    updateEditor(input: $input) {
      ...EditorResponseFragment
    }
  }
  ${EDITOR_RESPONSE_FRAGMENT}
`;

// Tipos TypeScript para las responses (coinciden con GraphQL)
export interface EditorObjectLayerResponse {
  id?: string;
  transform?: {
    posX?: number;
    posY?: number;
    width?: number;
    height?: number;
    radius?: number;
    rotation?: number;
    scaleX?: number;
    scaleY?: number;
    points?: number[];
  };
  state?: {
    objectLayerSelectedId?: string;
    draggable?: boolean;
    isSelected?: boolean;
    isVisible?: boolean;
  };
  style?: {
    tool?: string;
    fill?: string;
    color?: string;
    stroke?: number;
    strokeWidth?: number;
    zIndex?: number;
  };
  drawLine?: {
    tool: string;
    lines?: number[];
    brush?: {
      color?: string;
      fill?: string;
      size?: number;
    };
  };
  hasImageContent?: boolean;
  imageContent?: {
    image?: string;
    src?: string;
    loading?: boolean;
  };
  objectMetadata?: {
    createdAt?: string;
    updatedAt?: string;
  };
}

export interface EditorResponse {
  id?: string;
  userId?: string;
  projectId?: string;
  objectLayers?: EditorObjectLayerResponse[];
  objectLayerSelected?: EditorObjectLayerResponse;
  activeDrawLine?: {
    tool: string;
    lines?: number[];
    brush?: {
      color?: string;
      fill?: string;
      size?: number;
    };
  };
  editorDimension?: {
    width?: number;
    height?: number;
  };
  screenInfo?: {
    zoom?: number;
    visualMode?: string;
    status?: boolean;
  };
  editorMetadata?: {
    createdAt?: string;
    updatedAt?: string;
  };
}

export interface EditorStatsResponse {
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

export interface EditorMutationResponse {
  success?: boolean;
  message?: string;
  errorCode?: string;
  timestamp?: string;
  operation?: string;
  executionTimeMs?: number;
  warnings?: string[];
  hasUnsavedChanges?: boolean;
  editor?: EditorResponse;
  stats?: EditorStatsResponse;
}

// Variables para las queries
export interface GetEditorVariables {
  input: {
    projectId: string;
    userId: string;
  };
}

export interface CreateEditorVariables {
  input: {
    projectId: string;
    userId: string;
  };
}

export interface UpdateEditorVariables {
  input: {
    projectId: string;
    userId: string;
    objectLayers?: EditorObjectLayerResponse[];
    objectLayerSelected?: EditorObjectLayerResponse;
    activeDrawLine?: {
      tool: string;
      lines?: number[];
      brush?: {
        color?: string;
        fill?: string;
        size?: number;
      };
    };
    editorDimension?: {
      width?: number;
      height?: number;
    };
    screenInfo?: {
      zoom?: number;
      visualMode?: string;
      status?: boolean;
    };
    editorMetadata?: {
      createdAt?: string;
      updatedAt?: string;
    };
  };
}

export interface EditorExistsVariables {
  projectId: string;
}

// Helpers para transformar datos
export const transformEditorResponse = (response: EditorResponse): Editor => {
  return {
    id: response.id,
    userId: response.userId,
    projectId: response.projectId,
    objectLayers: response.objectLayers?.map(transformEditorObjectLayer) || [],
    objectLayerSelected: response.objectLayerSelected
      ? transformEditorObjectLayer(response.objectLayerSelected)
      : undefined,
    activeDrawLine: response.activeDrawLine
      ? {
          tool: response.activeDrawLine.tool as ToolType,
          lines: response.activeDrawLine.lines,
          brush: response.activeDrawLine.brush,
        }
      : undefined,
    editorDimension: response.editorDimension,
    screenInfo: response.screenInfo
      ? {
          ...response.screenInfo,
          visualMode: response.screenInfo.visualMode as VisualModeType,
        }
      : undefined,
    editorMetadata: response.editorMetadata,
  } as Editor;
};

export const transformEditorObjectLayer = (
  layer: EditorObjectLayerResponse
): EditorObjectLayer => {
  return {
    id: layer.id,
    transform: layer.transform,
    state: layer.state,
    style: layer.style,
    drawLine: layer.drawLine
      ? {
          tool: layer.drawLine.tool as ToolType,
          lines: layer.drawLine.lines,
          brush: layer.drawLine.brush,
        }
      : undefined,
    hasImageContent: layer.hasImageContent,
    imageContent: layer.imageContent,
    objectMetadata: layer.objectMetadata,
  } as EditorObjectLayer;
};

// Helper para convertir de Editor a UpdateEditorInput
export const editorToUpdateInput = (
  editor: Editor,
  projectId: string,
  userId: string
): UpdateEditorVariables["input"] => {
  return {
    projectId,
    userId,
    objectLayers: editor.objectLayers?.map((layer) => ({
      id: layer.id,
      transform: layer.transform,
      state: layer.state,
      style: layer.style,
      drawLine: layer.drawLine
        ? {
            tool: layer.drawLine.tool,
            lines: layer.drawLine.lines,
            brush: layer.drawLine.brush,
          }
        : undefined,
      hasImageContent: layer.hasImageContent,
      imageContent: layer.imageContent,
      objectMetadata: layer.objectMetadata,
    })),
    objectLayerSelected: editor.objectLayerSelected
      ? {
          id: editor.objectLayerSelected.id,
          transform: editor.objectLayerSelected.transform,
          state: editor.objectLayerSelected.state,
          style: editor.objectLayerSelected.style,
          drawLine: editor.objectLayerSelected.drawLine,
          hasImageContent: editor.objectLayerSelected.hasImageContent,
          imageContent: editor.objectLayerSelected.imageContent,
          objectMetadata: editor.objectLayerSelected.objectMetadata,
        }
      : undefined,
    activeDrawLine: editor.activeDrawLine,
    editorDimension: editor.editorDimension,
    screenInfo: editor.screenInfo,
    editorMetadata: editor.editorMetadata,
  };
};
