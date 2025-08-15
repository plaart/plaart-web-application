import { useNavigate } from "react-router-dom";
import { useFormattedDate } from "../../../hooks/useFormattedDate";
import type { Project } from "../../../types/Project";
import { RiFileTextLine, RiTimeLine } from "@remixicon/react";

interface RecentFilesGridProps {
  files: Project[];
}

export const RecentFilesGrid = ({ files }: RecentFilesGridProps) => {
  const navigate = useNavigate();
  const { formatDate } = useFormattedDate();

  const handleFileClick = (project: Project) => {
    // Navegar al editor con el ID del proyecto
    navigate(`/editor/${project.id}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {files.map((file) => (
        <div
          key={file.id}
          onClick={() => handleFileClick(file)}
          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <RiFileTextLine className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-xs text-gray-400">
              #{file.id.slice(-6)}
            </span>
          </div>
          
          <h3 className="font-medium text-gray-900 mb-2 truncate group-hover:text-blue-600 transition-colors">
            {file.name}
          </h3>
          
          {file.description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {file.description}
            </p>
          )}
          
          <div className="flex items-center text-xs text-gray-500">
            <RiTimeLine className="h-3 w-3 mr-1" />
            <span>Actualizado {formatDate(file.updatedAt)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
