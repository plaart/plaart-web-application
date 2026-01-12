/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import type { ToolAction, ToolHandler, ToolState } from "../../../types";
import usePointerUtils from "../utils/use-pointers-utils";
import type { KonvaEventObject } from "konva/lib/Node";

interface DrawHandler {
  drawRef: React.RefObject<boolean>;
  state: ToolState;
  action: ToolAction;
}

const useDrawHandler = ({
  drawRef,
  state,
  action,
}: DrawHandler): ToolHandler => {
  const { calculatePointerOffset, getPointerPosition } = usePointerUtils();

  // onStart
  const startDraw = useCallback(
    (e: KonvaEventObject<MouseEvent | TouchEvent | null>) => {
      drawRef.current = true;
      const stage = e.target.getStage();
      const pointerPosition = getPointerPosition(stage);
      if (stage && pointerPosition) {
        const pointerOffset = calculatePointerOffset(stage, pointerPosition);
        action.setLines((prevLines) => [
          ...prevLines,
          {
            tool: state.currentTool,
            points: [pointerOffset.x, pointerOffset.y],
            color: state.drawColor,
            width: state.drawWidth,
          },
        ]);
      }
    },
    [state.currentTool, state.drawColor, state.drawWidth, action.setLines]
  );
  // onMove
  const draw = useCallback(
    (e: KonvaEventObject<MouseEvent | TouchEvent | null>) => {
      if (!drawRef.current) return;
      const stage = e.target.getStage();
      const point = getPointerPosition(stage);
      if (stage && point) {
        const pointerOffset = calculatePointerOffset(stage, point);
        action.setLines((prevLines) => {
          const updatedLines = [...prevLines];
          const lastLine = { ...updatedLines[updatedLines.length - 1] };
          lastLine.points = lastLine.points.concat([
            pointerOffset.x,
            pointerOffset.y,
          ]);
          updatedLines[updatedLines.length - 1] = lastLine;
          return updatedLines;
        });
      }
    },
    [action.setLines]
  );
  // onEnd
  const endDraw = useCallback(
    (e: KonvaEventObject<MouseEvent | TouchEvent | null>) => {
      drawRef.current = false;
      if (e === null) return;
    },
    []
  );

  return { onStart: startDraw, onMove: draw, onEnd: endDraw, result: [] };
};

export default useDrawHandler;
