import { type EditorAction, type EditorState, Tool } from "../types/editor";

export const initialState: EditorState = {
  currentTool: Tool.BRUSH,
  drawColor: "#000000",
  drawWidth: 2,
  lines: [],
  aiPointsSelection: [],
  annotationsToDraw: [],
  selectedShapeDrawId: -1,
  zoom: 1,
  dimension: { width: 800, height: 600 },
};

// Reducer para manejar el estado
export const editorReducer = (
  state: EditorState,
  action: EditorAction
): EditorState => {
  switch (action.type) {
    case "SET_CURRENT_TOOL":
      return { ...state, currentTool: action.payload };

    case "SET_DRAW_COLOR":
      return { ...state, drawColor: action.payload };

    case "SET_DRAW_WIDTH":
      return { ...state, drawWidth: action.payload };

    case "SET_LINES":
      return {
        ...state,
        lines:
          typeof action.payload === "function"
            ? action.payload(state.lines)
            : action.payload,
      };

    case "SET_AI_POINTS_SELECTION":
      return {
        ...state,
        aiPointsSelection:
          typeof action.payload === "function"
            ? action.payload(state.aiPointsSelection)
            : action.payload,
      };

    case "SET_ANNOTATIONS_TO_DRAW":
      return {
        ...state,
        annotationsToDraw:
          typeof action.payload === "function"
            ? action.payload(state.annotationsToDraw)
            : action.payload,
      };

    case "SET_SELECTED_SHAPE_DRAW_ID":
      return { ...state, selectedShapeDrawId: action.payload };

    case "SET_ZOOM":
      return { ...state, zoom: action.payload };

    case "SET_CANVAS_DIMENSIONS":
      return {
        ...state,
        dimension: action.payload,
      };
    case "CLEAR_CANVAS":
      return {
        ...state,
        lines: [],
        aiPointsSelection: [],
        annotationsToDraw: [],
        selectedShapeDrawId: -1,
      };
    default:
      return state;
  }
};
