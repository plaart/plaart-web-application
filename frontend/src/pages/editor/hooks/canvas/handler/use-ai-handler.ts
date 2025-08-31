/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import type { ToolAction, ToolHandler, ToolState } from "../../../types";
import usePointerUtils from "../utils/use-pointers-utils";
import type { KonvaEventObject } from "konva/lib/Node";

interface AiHandlerProps {
  aiRef: React.RefObject<boolean>;
  state: ToolState;
  action: ToolAction;
}

const useAiHandler = ({
  aiRef,
  state,
  action,
}: AiHandlerProps): ToolHandler => {
  const { calculatePointerOffset, getPointerPosition } = usePointerUtils();
  const [aiSelected, setAiSelected] = useState(false);

  const updateAiSelectionLine = useCallback(
    (newPoints: { x: number; y: number }) => {
      if (!newPoints) return;
      action.setAiPointsSelection((prevLines) => {
        return [...prevLines, newPoints];
      });
    },
    [action.setAiPointsSelection]
  );

  const startAiDraw = useCallback(
    (e: KonvaEventObject<MouseEvent | TouchEvent | null>) => {
      // Reiniciar selección
      action.setAiPointsSelection([]);
      setAiSelected(true);
      aiRef.current = true;

      const stage = e.target.getStage();
      const pos = stage && getPointerPosition(stage);
      if (stage && pos) {
        const pointerOffset = calculatePointerOffset(stage, pos);
        action.setAiPointsSelection([
          { x: pointerOffset.x, y: pointerOffset.y },
        ]);
      }
    },
    [aiRef, action, calculatePointerOffset, getPointerPosition]
  );

  const addAiDraw = useCallback(
    (e: KonvaEventObject<MouseEvent | TouchEvent | null>) => {
      if (!aiSelected) return;

      const stage = e.target.getStage();
      const pos = stage && getPointerPosition(stage);
      if (stage && pos) {
        const pointerOffset = calculatePointerOffset(stage, pos);
        action.setAiPointsSelection((prev) => [
          ...prev,
          { x: pointerOffset.x, y: pointerOffset.y },
        ]);
      }
    },
    [aiSelected, action, calculatePointerOffset, getPointerPosition]
  );

  const endAiDraw = useCallback(
    (e: KonvaEventObject<MouseEvent | TouchEvent | null>) => {
      setAiSelected(false);
      aiRef.current = false;
      const points = state.aiPointsSelection;
      if (points && points.length > 0) {
        const firstPoint = points[0];
        if (firstPoint && "x" in firstPoint && "y" in firstPoint) {
          updateAiSelectionLine(firstPoint as { x: number; y: number });
        }
      }

      if (e === null) return;
    },
    [state.aiPointsSelection, updateAiSelectionLine]
  );

  return {
    onStart: startAiDraw,
    onMove: addAiDraw,
    onEnd: endAiDraw,
    result: state.annotationsToDraw,
  };
};

export default useAiHandler;
