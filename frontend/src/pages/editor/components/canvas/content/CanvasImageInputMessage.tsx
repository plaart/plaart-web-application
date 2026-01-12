import { RiImageLine } from "@remixicon/react";

interface CanvasImageInputMessageProps {
  show: boolean;
}

const CanvasImageInputMessage = ({ show }: CanvasImageInputMessageProps) => {
  if (!show) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="text-center">
        <RiImageLine className="mx-auto mb-3 text-gray-400" size={48} />
        <p className="text-gray-600 font-medium text-sm">
          Comienza a crear tu obra de arte
        </p>
        <p className="text-gray-500 text-xs mt-1">
          Selecciona una imagen
        </p>
      </div>
    </div>
  );
};

export default CanvasImageInputMessage;
