// 🔹 Extiende las definiciones de Konva.Stage para que TS reconozca los métodos
declare module "konva/lib/Stage" {
  interface Stage {
    perfectDrawEnabled?(enabled: boolean): this;
    hitGraphEnabled?(enabled: boolean): this;
  }
}

import { useCallback, useEffect, useRef } from "react";
import type {
  PerformanceMetrics,
  PerformanceWithMemory,
} from "../types/performance";
import type Konva from "konva";

export const useOptimizedKonva = () => {
  const performanceRef = useRef<PerformanceMetrics>({
    fps: 60,
    renderTime: 0,
    objectCount: 0,
    memoryUsage: 0,
    lastOptimization: null,
  });

  const frameTimeRef = useRef<number[]>([]);
  const lastFrameTime = useRef<number>(performance.now());
  const optimizationCooldownRef = useRef<number>(0);

  // Optimización automática del stage
  const optimizeStage = useCallback((stage: Konva.Stage) => {
    try {
      if (typeof stage.perfectDrawEnabled === "function") {
        stage.perfectDrawEnabled(false);
      }
      if (typeof stage.hitGraphEnabled === "function") {
        stage.hitGraphEnabled(false);
      }

      stage.listening(true);

      const container = stage.container();
      if (container) {
        container.style.outline = "none";
        container.tabIndex = 1;
      }

      // Optimización de capas
      stage.getLayers().forEach((layer) => {
        if (typeof layer.hitGraphEnabled === "function") {
          layer.hitGraphEnabled(false);
        }
        layer.listening(true);

        const objectCount = layer.getChildren().length;
        if (objectCount > 100 && !layer.isCached()) {
          try {
            layer.cache({
              pixelRatio: Math.min(window.devicePixelRatio, 2),
            });
          } catch (err) {
            console.warn("Error cacheando layer:", err);
          }
        }
      });

      performanceRef.current.lastOptimization = new Date();
      console.log(
        "🚀 Stage optimizado para",
        stage.getLayers().length,
        "capas"
      );
    } catch (error) {
      console.warn("Error optimizando stage:", error);
    }
  }, []);

  const measureFPS = useCallback(() => {
    const now = performance.now();
    const frameTime = now - lastFrameTime.current;
    lastFrameTime.current = now;

    if (frameTimeRef.current.length % 5 === 0) {
      frameTimeRef.current.push(frameTime);
      if (frameTimeRef.current.length > 30) {
        frameTimeRef.current.shift();
      }

      if (frameTimeRef.current.length >= 10) {
        const avgFrameTime =
          frameTimeRef.current.reduce((a, b) => a + b, 0) /
          frameTimeRef.current.length;
        const fps = Math.round(1000 / avgFrameTime);

        performanceRef.current.fps = fps;

        const currentTime = Date.now();
        if (fps < 30 && currentTime - optimizationCooldownRef.current > 5000) {
          console.warn("⚠️ FPS bajo detectado:", fps, "fps");
          optimizationCooldownRef.current = currentTime;
          return true;
        }
      }
    }

    return false;
  }, []);

  const optimizeShape = useCallback(
    (shape: Konva.Node, isStatic: boolean = false) => {
      try {
        if (isStatic) {
          if (!shape.isCached()) {
            shape.cache();
          }
          shape.listening(false);
        } else {
          if (shape.isCached()) {
            shape.clearCache();
          }
          shape.listening(true);
        }

        if (
          shape.filters() &&
          shape.filters().length > 0 &&
          !shape.isCached()
        ) {
          shape.cache();
        }
      } catch (error) {
        console.warn("Error optimizando shape:", error);
      }
    },
    []
  );

  const throttledMouseMove = useCallback(
    <T extends (...args: unknown[]) => void>(
      handler: T,
      limit: number = 16
    ) => {
      let rafId: number;
      let lastRan = 0;

      return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
        const now = Date.now();

        if (now - lastRan >= limit) {
          handler.apply(this, args);
          lastRan = now;
        } else {
          cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(() => {
            if (Date.now() - lastRan >= limit) {
              handler.apply(this, args);
              lastRan = Date.now();
            }
          });
        }
      };
    },
    []
  );

  const optimizeMemory = useCallback((stage: Konva.Stage) => {
    try {
      const stageRect = stage.getClientRect();
      let clearedCount = 0;

      stage.find("*").forEach((node) => {
        try {
          const nodeRect = node.getClientRect();

          const isVisible = !(
            nodeRect.x + nodeRect.width < stageRect.x ||
            nodeRect.x > stageRect.x + stageRect.width ||
            nodeRect.y + nodeRect.height < stageRect.y ||
            nodeRect.y > stageRect.y + stageRect.height
          );

          if (!isVisible && node.isCached()) {
            node.clearCache();
            clearedCount++;
          }
        } catch {
          // Ignorar errores de nodos individuales
        }
      });

      if (clearedCount > 0) {
        stage.batchDraw();
        console.log(
          `🧹 Memoria optimizada - ${clearedCount} objetos limpiados`
        );
      }
    } catch (error) {
      console.warn("Error optimizando memoria:", error);
    }
  }, []);

  useEffect(() => {
    const optimizationInterval = setInterval(() => {
      const needsOptimization = measureFPS();
      if (needsOptimization) {
        console.log("🔧 Aplicando optimización automática...");
      }
    }, 5000);

    return () => clearInterval(optimizationInterval);
  }, [measureFPS]);

  const detectMemoryLeaks = useCallback(() => {
    try {
      if ("memory" in performance) {
        const memInfo = (performance as PerformanceWithMemory).memory;
        const memoryUsage = memInfo.usedJSHeapSize / memInfo.totalJSHeapSize;

        performanceRef.current.memoryUsage = memoryUsage;

        if (memoryUsage > 0.85) {
          console.warn(
            "⚠️ Alto uso de memoria detectado:",
            Math.round(memoryUsage * 100) + "%"
          );
          return true;
        }
      }
    } catch (error) {
      console.warn("Error detectando memory leaks:", error);
    }
    return false;
  }, []);

  return {
    optimizeStage,
    optimizeShape,
    optimizeMemory,
    throttledMouseMove,
    measureFPS,
    detectMemoryLeaks,
    metrics: performanceRef.current,
  };
};
