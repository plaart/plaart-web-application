import { Group, Layer } from "react-konva";
import { SHAPE, type ShapeProps } from "../../../types";
import RectShape from "../shapes/RectShape";
import CircleShape from "../shapes/CircleShape";

interface KonvaShapeLayerProps {
  shapes: ShapeProps[];
}

const KonvaShapeLayer = ({ shapes }: KonvaShapeLayerProps) => {
  return (
    <Layer>
      <Group>
        {shapes.map((shape, index) => {
          const key =
            index + `${shape.shapeLayer.state?.objectLayerSelectedId}`;
          const commonProps = {
            onSelected: shape.onSelected,
            shapeLayer: shape.shapeLayer,
            onChange: shape.onChange,
            parentScale: shape.parentScale,
          };

          switch (shape.shapeLayer.drawLine?.tool) {
            case SHAPE.RECTANGLE:
              return <RectShape key={key} {...commonProps} />;
            case SHAPE.CIRCLE:
              return <CircleShape key={key} {...commonProps} />;
            default:
              return null;
          }
        })}
      </Group>
    </Layer>
  );
};

export default KonvaShapeLayer;
