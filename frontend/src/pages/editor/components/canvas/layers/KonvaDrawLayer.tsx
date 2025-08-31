import type { CursorPosition, DrawLine, ToolType } from "../../../types";
import { Circle, Layer, Line } from "react-konva";

interface KonvaDrawToolProps {
  tool: ToolType;
  drawline: DrawLine[];
  cursorPosition: CursorPosition;
  strokeWidth: number;
}
const KonvaDrawLayer = ({
  tool,
  drawline,
  cursorPosition,
  strokeWidth,
}: KonvaDrawToolProps) => {
  return (
    <Layer>
      {drawline.map((line, i) => (
        <Line
          key={i}
          points={line.points}
          stroke={line.color}
          strokeWidth={line.width}
          tension={0.5}
          lineCap="round"
          lineJoin="round"
          globalCompositeOperation={
            tool === "eraser" ? "destination-out" : "source-over"
          }
        />
      ))}
      {cursorPosition && (tool === "pen" || tool === "eraser") && (
        <Circle
          key={`${tool}`}
          x={cursorPosition.x}
          y={cursorPosition.y}
          radius={strokeWidth / 2}
          stroke={tool === "eraser" ? "yellow" : "red"}
          fill="transparent"
        />
      )}
    </Layer>
  );
};

export default KonvaDrawLayer;
