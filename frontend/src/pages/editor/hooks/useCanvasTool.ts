import { useCallback, useRef } from "react";
import useDrawHandler from "./canvas/handler/use-draw-handler";
import type { ToolAction, ToolHandler, ToolState, ToolType } from "../types";
import useAiHandler from "./canvas/handler/use-ai-handler";
import useShapeHandler from "./canvas/handler/use-shape-handler";
import { Tool } from "../types/editor/editor.enums";
import type { KonvaEventObject } from "konva/lib/Node";

interface CanvasToolConfig {
  tool: ToolType;
  action: ToolAction;
  state: ToolState;
}

const useCanvasTool = ({ tool, action, state }: CanvasToolConfig) => {
  const drawRef = useRef<boolean>(false);
  const aiRef = useRef<boolean>(false);
  const shapeRef = useRef<boolean>(false);

  // useDrawHandler(drawToolRef, state, action)
  const drawToolHandlers = useDrawHandler({
    drawRef,
    state,
    action,
  });
  // useAiHandler(aiToolRef, state, action)
  const aiToolHandlers = useAiHandler({
    aiRef,
    state,
    action,
  });

  const shapeToolHandlers = useShapeHandler({
    shapeRef,
    state,
    action,
  });

  // Función para limpiar todos los estados activos
  const clearActiveStates = useCallback(() => {
    drawRef.current = false;
    aiRef.current = false;
    shapeRef.current = false;
  }, []);

  // Seleccionar handlers según la herramienta activa
  const getActiveHandlers = useCallback((): ToolHandler => {
    switch (tool as ToolType) {
      case Tool.BRUSH:
      case Tool.PEN:
      case Tool.ERASER:
        return drawToolHandlers;
      case Tool.AI:
        return aiToolHandlers;
      case Tool.RECTANGLE:
      case Tool.CIRCLE:
        return shapeToolHandlers;
      default:
        // Handler por defecto que no hace nada
        return {
          onStart: () => {},
          onMove: () => {},
          onEnd: () => {},
          result: [],
        };
    }
  }, [tool, drawToolHandlers, aiToolHandlers, shapeToolHandlers]);

  // Handlers unificados que delegan a la herramienta activa
  const unifiedHandlers: ToolHandler = {
    onStart: useCallback((e: KonvaEventObject<MouseEvent | TouchEvent | null>) => {
      const activeHandlers = getActiveHandlers();
      activeHandlers.onStart(e);
    }, [getActiveHandlers]),

    onMove: useCallback((e: KonvaEventObject<MouseEvent | TouchEvent | null>) => {
      const activeHandlers = getActiveHandlers();
      activeHandlers.onMove(e);
    }, [getActiveHandlers]),

    onEnd: useCallback((e: KonvaEventObject<MouseEvent | TouchEvent | null>) => {
      const activeHandlers = getActiveHandlers();
      activeHandlers.onEnd(e);
    }, [getActiveHandlers]),
    result: getActiveHandlers().result,
  };

  return {
    handlers: unifiedHandlers,
    clearActiveStates,
  };
};

export default useCanvasTool;
