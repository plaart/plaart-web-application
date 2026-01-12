import { useEffect, useState, type RefObject } from "react";
import { Stage } from "konva/lib/Stage";

import { throttleWrite } from "../utils/editorUtils";
import type { CursorPosition, ToolType } from "../types";

interface UseCursorGhostReturn {
  cursorPosition: CursorPosition | null;
}

export function useCursorGhost(
  tool: ToolType,
  stageRef: RefObject<Stage>
): UseCursorGhostReturn {
  const [cursorPosition, setCursorPosition] = useState<CursorPosition | null>(
    null
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      throttleWrite(() => {
        if (!["pen", "eraser", "ai"].includes(tool)) {
          setCursorPosition(null);
          return;
        }

        const stage = stageRef.current;
        if (!stage) return;

        const target = e.target as HTMLElement;
        if (target.tagName === "CANVAS") {
          const position = stage.getPointerPosition();
          setCursorPosition(position ?? null);
        } else {
          setCursorPosition(null);
        }
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleMouseMove);
    };
  }, [tool, stageRef]);

  return { cursorPosition };
}
