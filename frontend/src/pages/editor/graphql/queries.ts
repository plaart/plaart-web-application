import { gql } from '@apollo/client';

// Fragments para reutilizar
export const EDITOR_STATS_FRAGMENT = gql`
  fragment EditorStatsFragment on EditorStats {
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
`;

export const IMAGE_CONTENT_FRAGMENT = gql`
  fragment ImageContentFragment on ImageContent {
    image
    src
    loading
  }
`;

export const TRANSFORM_FRAGMENT = gql`
  fragment TransformFragment on Transform {
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
`;

export const STATE_FRAGMENT = gql`
  fragment StateFragment on State {
    objectLayerSelectedId
    draggable
    isSelected
    isVisible
  }
`;

export const STYLE_FRAGMENT = gql`
  fragment StyleFragment on Style {
    tool
    fill
    color
    stroke
    strokeWidth
    zIndex
  }
`;

export const BRUSH_FRAGMENT = gql`
  fragment BrushFragment on Brush {
    color
    fill
    size
  }
`;

export const DRAW_LINE_FRAGMENT = gql`
  fragment DrawLineFragment on DrawLine {
    tool
    lines
    brush {
      ...BrushFragment
    }
  }
  ${BRUSH_FRAGMENT}
`;

export const EDITOR_METADATA_FRAGMENT = gql`
  fragment EditorMetaDataFragment on EditorMetaData {
    createdAt
    updatedAt
  }
`;

export const EDITOR_OBJECT_LAYER_FRAGMENT = gql`
  fragment EditorObjectLayerFragment on EditorObjectLayer {
    id
    hasImageContent
    transform {
      ...TransformFragment
    }
    state {
      ...StateFragment
    }
    style {
      ...StyleFragment
    }
    drawLine {
      ...DrawLineFragment
    }
    imageContent {
      ...ImageContentFragment
    }
    objectMetadata {
      ...EditorMetaDataFragment
    }
  }
  ${TRANSFORM_FRAGMENT}
  ${STATE_FRAGMENT}
  ${STYLE_FRAGMENT}
  ${DRAW_LINE_FRAGMENT}
  ${IMAGE_CONTENT_FRAGMENT}
  ${EDITOR_METADATA_FRAGMENT}
`;

export const EDITOR_SCREEN_INFO_FRAGMENT = gql`
  fragment EditorScreenInfoFragment on EditorScreenInfo {
    zoom
    visualMode
    status
  }
`;

export const DIMENSION_FRAGMENT = gql`
  fragment DimensionFragment on Dimension {
    width
    height
  }
`;

export const EDITOR_FRAGMENT = gql`
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
      ...DrawLineFragment
    }
    editorDimension {
      ...DimensionFragment
    }
    screenInfo {
      ...EditorScreenInfoFragment
    }
    editorMetadata {
      ...EditorMetaDataFragment
    }
  }
  ${EDITOR_OBJECT_LAYER_FRAGMENT}
  ${DRAW_LINE_FRAGMENT}
  ${DIMENSION_FRAGMENT}
  ${EDITOR_SCREEN_INFO_FRAGMENT}
  ${EDITOR_METADATA_FRAGMENT}
`;

export const EDITOR_RESPONSE_FRAGMENT = gql`
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
      ...EditorStatsFragment
    }
  }
  ${EDITOR_FRAGMENT}
  ${EDITOR_STATS_FRAGMENT}
`;

// Queries
export const GET_EDITOR = gql`
  query GetEditor($input: RequestEditor!) {
    getEditor(input: $input) {
      ...EditorResponseFragment
    }
  }
  ${EDITOR_RESPONSE_FRAGMENT}
`;

export const GET_EDITOR_STATS = gql`
  query GetEditorStats($input: RequestEditor!) {
    getEditorStats(input: $input) {
      ...EditorStatsFragment
    }
  }
  ${EDITOR_STATS_FRAGMENT}
`;

export const EDITOR_EXISTS = gql`
  query EditorExists($projectId: String!) {
    editorExists(projectId: $projectId)
  }
`;

// Mutations
export const CREATE_EDITOR = gql`
  mutation CreateEditor($input: RequestEditor!) {
    createEditor(input: $input) {
      ...EditorResponseFragment
    }
  }
  ${EDITOR_RESPONSE_FRAGMENT}
`;

export const UPDATE_EDITOR = gql`
  mutation UpdateEditor($input: UpdateEditorInput!) {
    updateEditor(input: $input) {
      ...EditorResponseFragment
    }
  }
  ${EDITOR_RESPONSE_FRAGMENT}
`;
