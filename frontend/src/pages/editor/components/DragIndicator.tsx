import React from 'react';

interface DragIndicatorProps {
  dragHandlers: {
    onMouseDown: (e: React.MouseEvent) => void;
    onMouseMove: (e: React.MouseEvent) => void;
    onMouseUp: (e: React.MouseEvent) => void;
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onTouchEnd: (e: React.TouchEvent) => void;
  };
}

const DragIndicator = ({ dragHandlers }: DragIndicatorProps) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-2 bg-transparent z-50 cursor-ns-resize"
      {...dragHandlers}
    >
      {/* Indicador visual sutil */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-300 rounded-full opacity-50 hover:opacity-100 transition-opacity" />
    </div>
  );
};

export default DragIndicator;
