import { useCallback } from "react";
import type {
  CanvasShape,
  ToolAction,
  ToolHandler,
  ToolState,
} from "../../../types";
import type { KonvaEventObject } from "konva/lib/Node";

interface ShapeHandlerProps {
  shapeRef: React.RefObject<boolean>;
  state: ToolState;
  action: ToolAction;
}

const useShapeHandler = ({
  shapeRef,
  state,
  action,
}: ShapeHandlerProps): ToolHandler => {
  const { setAnnotationsToDraw, setSelectedShapeDrawId } = action;
  const { currentTool: tool, selectedShapeDrawId } = state;

  // Start drawing a new shape
  const startShapeDrawing = useCallback(
    (e: KonvaEventObject<MouseEvent | TouchEvent | null>) => {
      shapeRef.current = true;
      const stage = e.target.getStage();
      const pos = stage?.getPointerPosition();
      if (!stage || !pos) return;

      const newShape: CanvasShape = {
        x: pos.x,
        y: pos.y,
        width: 0,
        height: 0,
        tool,
        id: Date.now(),
        radius: 0,
      };

      setAnnotationsToDraw((prev) => {
        const newAnnotations = [...prev, newShape];
        setSelectedShapeDrawId(newAnnotations.length - 1);
        return newAnnotations;
      });
    },
    [shapeRef, setAnnotationsToDraw, setSelectedShapeDrawId, tool]
  );

  // Update shape while dragging
  const addShapeByDrawing = useCallback(
    (e: KonvaEventObject<MouseEvent | TouchEvent | null>) => {
      if (!shapeRef.current) return;

      const stage = e.target.getStage();
      const pos = stage?.getPointerPosition();
      if (!stage || !pos) return;

      setAnnotationsToDraw((prev) => {
        const updatedAnnotations = [...prev];
        const shape = updatedAnnotations[selectedShapeDrawId];

        if (shape) {
          const width = pos.x - shape.x;
          const height = pos.y - shape.y;
          updatedAnnotations[selectedShapeDrawId] = {
            ...shape,
            width: tool === "circle" ? Math.abs(width) : width,
            height: tool === "circle" ? Math.abs(width) : height,
            radius: tool === "circle" ? Math.abs(width) / 2 : shape.radius,
          };
        }

        return updatedAnnotations;
      });
    },
    [shapeRef, selectedShapeDrawId, setAnnotationsToDraw, tool]
  );

  // Stop drawing
  const stopShapeDrawing = useCallback(() => {
    if (!shapeRef.current) return;
    shapeRef.current = false;
    setSelectedShapeDrawId(-1);
  }, [shapeRef, setSelectedShapeDrawId]);

  return {
    onStart: startShapeDrawing,
    onMove: addShapeByDrawing,
    onEnd: stopShapeDrawing,
    result: state.annotationsToDraw,
  };
};

export default useShapeHandler;
