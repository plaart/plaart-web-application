import { useNavigate } from "react-router-dom";
import { useFormattedDate } from "../../../hooks/useFormattedDate";
import type { Project } from "../../../types/Project";
import { 
  RiFileTextLine, 
  RiMoreLine, 
  RiEditLine, 
  RiDeleteBinLine,
  RiFileCopyLine,
  RiTimeLine 
} from "@remixicon/react";
import { useState } from "react";

interface FileCardProps {
  file: Project;
  onDelete?: (projectId: string) => void;
  onDuplicate?: (projectId: string) => void;
}

export const FileCard = ({ file, onDelete, onDuplicate }: FileCardProps) => {
  const navigate = useNavigate();
  const { formatDate } = useFormattedDate();
  const [showMenu, setShowMenu] = useState(false);

  const handleFileClick = () => {
    navigate(`/editor/${file.id}`);
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleAction = (action: () => void) => {
    action();
    setShowMenu(false);
  };

  return (
    <div className="relative">
      <div
        onClick={handleFileClick}
        className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <RiFileTextLine className="h-6 w-6 text-blue-600" />
          </div>
          <button
            onClick={handleMenuClick}
            className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-opacity"
          >
            <RiMoreLine className="h-5 w-5" />
          </button>
        </div>
        
        <h3 className="font-medium text-gray-900 mb-2 truncate group-hover:text-blue-600 transition-colors">
          {file.name}
        </h3>
        
        {file.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2 min-h-[2.5rem]">
            {file.description}
          </p>
        )}
        
        <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
          <div className="flex items-center">
            <RiTimeLine className="h-3 w-3 mr-1" />
            <span>{formatDate(file.updatedAt)}</span>
          </div>
          <span className="text-gray-400">#{file.id.slice(-6)}</span>
        </div>
      </div>

      {/* Menu dropdown */}
      {showMenu && (
        <div className="absolute right-4 top-14 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
          <div className="py-1">
            <button
              onClick={() => handleAction(handleFileClick)}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              <RiEditLine className="h-4 w-4 mr-2" />
              Abrir en editor
            </button>
            {onDuplicate && (
              <button
                onClick={() => handleAction(() => onDuplicate(file.id))}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                <RiFileCopyLine className="h-4 w-4 mr-2" />
                Duplicar
              </button>
            )}
            <hr className="my-1" />
            {onDelete && (
              <button
                onClick={() => handleAction(() => onDelete(file.id))}
                className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
              >
                <RiDeleteBinLine className="h-4 w-4 mr-2" />
                Eliminar
              </button>
            )}
          </div>
        </div>
      )}

      {/* Click outside to close menu */}
      {showMenu && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  );
};
