import { useCallback } from "react";
import type { CursorPosition, PointerPosition } from "../../../types";
import type { Stage } from "konva/lib/Stage";

const usePointerUtils = () => {
  // Calcular offset del puntero considerando zoom y posición del stage
  const calculatePointerOffset = useCallback(
    (stage: Stage, pos: PointerPosition): CursorPosition => {
      const scale = stage.scaleX();
      return {
        x: (pos.x - stage.x()) / scale,
        y: (pos.y - stage.y()) / scale,
      };
    },
    []
  );

  // Obtener posición del puntero con offset calculado
  const getPointerPosition = useCallback(
    (stage: Stage | null): PointerPosition => {
      if (!stage) return { x: 0, y: 0 };
      const pos = stage.getPointerPosition();
      if (!pos) return { x: 0, y: 0 };

      return pos;
    },
    []
  );

  // Calcular distancia entre dos puntos
  const calculateDistance = useCallback(
    (point1: PointerPosition, point2: PointerPosition): number => {
      const dx = point2.x - point1.x;
      const dy = point2.y - point1.y;
      return Math.sqrt(dx * dx + dy * dy);
    },
    []
  );

  // Convertir array de puntos a coordenadas planas para Konva
  const pointsToFlatArray = useCallback(
    (points: PointerPosition[]): number[] => {
      return points.flatMap((point) => [point.x, point.y]);
    },
    []
  );

  // Convertir coordenadas planas a array de puntos
  const flatArrayToPoints = useCallback(
    (flatArray: number[]): PointerPosition[] => {
      const points: PointerPosition[] = [];
      for (let i = 0; i < flatArray.length; i += 2) {
        points.push({ x: flatArray[i], y: flatArray[i + 1] });
      }
      return points;
    },
    []
  );

  return {
    calculatePointerOffset,
    getPointerPosition,
    calculateDistance,
    pointsToFlatArray,
    flatArrayToPoints,
  };
};

export default usePointerUtils;
