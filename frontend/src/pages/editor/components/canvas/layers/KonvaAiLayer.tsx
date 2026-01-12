import React, {
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useState,
} from "react";
import type { CursorPosition, ToolType } from "../../../types";
import { Image, Layer, Line } from "react-konva";
import ReactDOMServer from "react-dom/server";
import type Konva from "konva";

interface KonvaAiLayerProps {
  aiPointSelection: number[];
  cursorPosition?: CursorPosition;
  svgUrl?: React.ReactElement | null;
  tool?: ToolType;
}

const KonvaAiLayer = ({
  aiPointSelection,
  cursorPosition,
  svgUrl,
  tool,
}: KonvaAiLayerProps) => {
  const imageRef = useRef<Konva.Image>(null);
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);

  // Memoizar el SVG renderizado para evitar re-renders innecesarios
  const svgDataUrl = useMemo(() => {
    if (!svgUrl) return null;

    try {
      const svgString = ReactDOMServer.renderToStaticMarkup(svgUrl);
      const encodedData = encodeURIComponent(svgString);
      return `data:image/svg+xml;charset=utf-8,${encodedData}`;
    } catch (error) {
      console.error("Error rendering SVG:", error);
      return null;
    }
  }, [svgUrl]);

  // Función para manejar la carga de imagen
  const handleImageLoad = useCallback((img: HTMLImageElement) => {
    setLoadedImage(img);
  }, []);

  // Función para manejar errores de carga (corregido el tipo)
  const handleImageError = useCallback((event: string | Event) => {
    console.error("Error loading SVG image:", event);
    setLoadedImage(null);
  }, []);

  useEffect(() => {
    if (!svgDataUrl) {
      setLoadedImage(null);
      return;
    }

    const img = new window.Image();

    img.onload = () => handleImageLoad(img);
    img.onerror = handleImageError;
    img.src = svgDataUrl;

    // Cleanup al desmontar o cambiar
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [svgDataUrl, handleImageLoad, handleImageError]);

  // Mostrar imagen solo si el cursor está presente y la herramienta es "ai"
  const showCursorImage = cursorPosition && tool === "ai";

  return (
    <Layer>
      {/* Línea con borde blanco y interior negro para mejor visibilidad */}
      {aiPointSelection.length > 0 && (
        <>
          {/* Línea exterior blanca (más gruesa) */}
          <Line
            points={aiPointSelection}
            stroke="white"
            strokeWidth={3}
            lineJoin="round"
            lineCap="round"
            dash={[6, 6]}
            strokeScaleEnabled={false}
            perfectDrawEnabled={false}
          />
          {/* Línea interior negra */}
          <Line
            points={aiPointSelection}
            stroke="black"
            strokeWidth={1.5}
            lineJoin="round"
            lineCap="round"
            dash={[6, 6]}
            strokeScaleEnabled={false}
            perfectDrawEnabled={false}
          />
        </>
      )}

      {showCursorImage && loadedImage && (
        <Image
          ref={imageRef}
          image={loadedImage}
          x={cursorPosition.x - 12.5} // Centrar mejor la imagen
          y={cursorPosition.y - 12.5}
          width={25}
          height={25}
          listening={false}
          perfectDrawEnabled={false}
        />
      )}
    </Layer>
  );
};

export default React.memo(KonvaAiLayer);
