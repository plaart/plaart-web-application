/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from "react";
import Konva from "konva";

import { useOptimizedKonva } from "../../hooks/useOptimizedKonva";
import CanvasStage from "./Canvas";
import { useEditor } from "../../hooks/useEditor";
import useCanvasTool from "../../hooks/useCanvasTool";
import { useCursorGhost } from "../../hooks/useCursorGhost";
import KonvaDrawLayer from "./layers/KonvaDrawLayer";
import type { CursorPosition } from "../../types";

export const CanvasContainer: React.FC = () => {
  const { state, action } = useEditor();
  const stageRef = useRef<Konva.Stage>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // const scaleBy = 1.05;

  const { handlers } = useCanvasTool({
    tool: state.currentTool,
    action,
    state,
  });
  const stageRefSecure = stageRef as React.RefObject<Konva.Stage>;
  const { cursorPosition } = useCursorGhost(state.currentTool, stageRefSecure);
  const { optimizeStage } = useOptimizedKonva();
  const cursorPositionSecure = cursorPosition as CursorPosition;

  useEffect(() => {
    if (stageRef.current) {
      optimizeStage(stageRef.current);
    }
  }, [optimizeStage]);

  return (
    <div className="flex-1 bg-gray-100 flex items-center justify-center p-8 h-[825px] rounded-2xl">
      <div className="bg-white shadow-sm border border-gray-200 overflow-hidden w-[90%] h-[100%] relative">
        <div
          ref={containerRef}
          className="w-full h-full bg-gray-50 relative overflow-hidden">
          <CanvasStage
            stageRef={stageRefSecure}
            handlers={handlers}
            canvasSize={state.dimension}
            cursorPosition={cursorPositionSecure}
            currentTool={state.currentTool}>
            <KonvaDrawLayer
              cursorPosition={cursorPositionSecure}
              drawline={state.lines}
              strokeWidth={state.drawWidth}
              tool={state.currentTool}
            />
          </CanvasStage>
        </div>
      </div>
    </div>
  );
};

export default CanvasContainer;
