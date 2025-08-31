import { useCallback } from "react";
import type {
  CanvasShape,
  DrawLine,
  EditorAction,
  Point,
  ToolType,
} from "../../types";

interface HandlerActionsProps {
  dispatch: React.Dispatch<EditorAction>;
}

const useHandlerToolActions = ({ dispatch }: HandlerActionsProps) => {
  return {
    setLines: useCallback(
      (lines: DrawLine[] | ((prev: DrawLine[]) => DrawLine[])) => {
        dispatch({ type: "SET_LINES", payload: lines });
      },
      [dispatch]
    ),

    setAiPointsSelection: useCallback(
      (points: Point[] | ((prev: Point[]) => Point[])) => {
        dispatch({ type: "SET_AI_POINTS_SELECTION", payload: points });
      },
      [dispatch]
    ),

    setAnnotationsToDraw: useCallback(
      (shapes: CanvasShape[] | ((prev: CanvasShape[]) => CanvasShape[])) => {
        dispatch({ type: "SET_ANNOTATIONS_TO_DRAW", payload: shapes });
      },
      [dispatch]
    ),

    setSelectedShapeDrawId: useCallback(
      (id: number) => {
        dispatch({ type: "SET_SELECTED_SHAPE_DRAW_ID", payload: id });
      },
      [dispatch]
    ),

    setDrawColor: useCallback(
      (color: string) => {
        dispatch({ type: "SET_DRAW_COLOR", payload: color });
      },
      [dispatch]
    ),

    setDrawWidth: useCallback(
      (width: number) => {
        dispatch({ type: "SET_DRAW_WIDTH", payload: width });
      },
      [dispatch]
    ),

    setCurrentTool: useCallback(
      (tool: ToolType) => {
        dispatch({ type: "SET_CURRENT_TOOL", payload: tool });
      },
      [dispatch]
    ),
  };
};

export default useHandlerToolActions;
