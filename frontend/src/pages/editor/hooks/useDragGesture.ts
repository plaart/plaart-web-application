import { useState, useCallback, useRef } from 'react';

interface DragGestureOptions {
  onDragThreshold?: () => void;
  threshold?: number;
}

interface DragState {
  isDragging: boolean;
  startY: number;
  currentY: number;
  deltaY: number;
}

export const useDragGesture = ({ onDragThreshold, threshold = 80 }: DragGestureOptions) => {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    startY: 0,
    currentY: 0,
    deltaY: 0
  });

  const thresholdReached = useRef(false);

  const handleDragStart = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    setDragState({
      isDragging: true,
      startY: clientY,
      currentY: clientY,
      deltaY: 0
    });
    
    thresholdReached.current = false;
  }, []);

  const handleDragMove = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    if (!dragState.isDragging) return;

    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const deltaY = clientY - dragState.startY;

    setDragState(prev => ({
      ...prev,
      currentY: clientY,
      deltaY
    }));

    // Verificar si se alcanzó el threshold
    if (!thresholdReached.current && Math.abs(deltaY) >= threshold) {
      thresholdReached.current = true;
      onDragThreshold?.();
    }
  }, [dragState.isDragging, dragState.startY, threshold, onDragThreshold]);

  const handleDragEnd = useCallback(() => {
    setDragState({
      isDragging: false,
      startY: 0,
      currentY: 0,
      deltaY: 0
    });
    
    thresholdReached.current = false;
  }, []);

  const dragHandlers = {
    onMouseDown: handleDragStart,
    onMouseMove: handleDragMove,
    onMouseUp: handleDragEnd,
    onTouchStart: handleDragStart,
    onTouchMove: handleDragMove,
    onTouchEnd: handleDragEnd
  };

  return {
    dragState,
    dragHandlers,
    isThresholdReached: thresholdReached.current
  };
};
