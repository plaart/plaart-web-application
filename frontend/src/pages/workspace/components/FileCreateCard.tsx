import { RiAddLine } from "@remixicon/react";

interface FileCreateCardProps {
  onClick?: () => void;
}

export const FileCreateCard = ({ onClick }: FileCreateCardProps) => {
  return (
    <div
      onClick={onClick}
      className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer group flex flex-col items-center justify-center min-h-[200px]"
    >
      <div className="p-3 bg-gray-100 group-hover:bg-blue-100 rounded-lg mb-3 transition-colors">
        <RiAddLine className="h-6 w-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
      </div>
      
      <h3 className="font-medium text-gray-600 group-hover:text-blue-600 transition-colors text-center">
        Crear nuevo proyecto
      </h3>
      
      <p className="text-sm text-gray-500 text-center mt-1">
        Haz clic para empezar
      </p>
    </div>
  );
};
