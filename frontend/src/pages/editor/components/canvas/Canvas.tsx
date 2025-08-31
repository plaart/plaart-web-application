import React from "react";
import { Stage } from "react-konva";
import {
  type CursorPosition,
  type Dimension,
  type ToolHandler,
  type ToolType,
} from "../../types/editor";

import type Konva from "konva";

interface CanvasProps {
  stageRef: React.RefObject<Konva.Stage>;
  canvasSize: Dimension;
  children: React.ReactNode;
  handlers: ToolHandler;
  cursorPosition: CursorPosition;
  currentTool: ToolType;
}

const Canvas = ({
  stageRef,
  canvasSize,
  children,
  handlers: {
    onStart: handleMouseDown,
    onMove: handleMouseMove,
    onEnd: handleMouseUp,
  },
}: CanvasProps) => {
  return (
    <Stage
      ref={stageRef}
      width={canvasSize.width}
      height={canvasSize.height}
      onMouseDown={handleMouseDown}
      onMousemove={handleMouseMove}
      onMouseup={handleMouseUp}>
      {children}
    </Stage>
  );
};

export default Canvas;
