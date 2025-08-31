import type Konva from "konva";
import { useEffect, useRef, useState } from "react";
import { Circle } from "react-konva";
import { MOUSE_EFFECTS, type ShapeProps } from "../../../types";

const CircleShape = ({
  shapeLayer,
  onSelected,
  onChange,
  parentScale,
}: ShapeProps) => {
  const shapeRef = useRef<Konva.Circle>(null);

  const [isDragging, setIsDragging] = useState(
    Boolean(shapeLayer.state?.draggable)
  );

  useEffect(() => {
    setIsDragging(Boolean(shapeLayer.state?.draggable));
  }, [shapeLayer]);

  useEffect(() => {
    if (shapeRef.current) {
      shapeRef.current.scale({
        x: 1 / parentScale,
        y: 1 / parentScale,
      });
    }
  }, [parentScale]);

  const handleDragEnd = (
    e: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) => {
    const target = e.target as Konva.Circle;
    const { x, y } = target.getPosition();
    onChange({
      ...shapeLayer,
      transform: {
        ...shapeLayer.transform,
        posX: x,
        posY: y,
      },
    });
  };

  const handleTransformEnd = (
    e: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) => {
    const node = e.target as Konva.Circle;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    const rotation = node.rotation();
    const radius = node.radius() * Math.max(scaleX, scaleY);

    // Reset scale to 1 after transform
    node.scaleX(1);
    node.scaleY(1);

    onChange({
      ...shapeLayer,
      transform: {
        ...shapeLayer.transform,
        posX: node.x(),
        posY: node.y(),
        radius,
        rotation,
        scaleX: 1,
        scaleY: 1,
      },
    });
  };

  return (
    <Circle
      ref={shapeRef}
      x={(shapeLayer.transform?.posX ?? 0) * parentScale}
      y={(shapeLayer.transform?.posY ?? 0) * parentScale}
      radius={(shapeLayer.transform?.radius ?? 0) * parentScale}
      rotation={shapeLayer.transform?.rotation ?? 0}
      fill={shapeLayer.style?.fill ?? "transparent"}
      stroke={shapeLayer.style?.color ?? "black"}
      strokeWidth={shapeLayer.style?.strokeWidth ?? 1}
      draggable={isDragging}
      onClick={onSelected}
      onTap={onSelected}
      onDragEnd={handleDragEnd}
      onTransformEnd={handleTransformEnd}
      onDragStart={() => setIsDragging(true)}
      onTransform={() => setIsDragging(false)}
      onMouseMove={(e) => e.target.setAttrs({ fill: MOUSE_EFFECTS.MOUSE_OVER })}
      onMouseOut={(e) => e.target.setAttrs({ fill: MOUSE_EFFECTS.MOUSE_OUT })}
    />
  );
};

export default CircleShape;
