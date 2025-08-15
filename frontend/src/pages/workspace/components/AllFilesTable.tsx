import { useNavigate } from "react-router-dom";
import { useFormattedDate } from "../../../hooks/useFormattedDate";
import type { Project } from "../../../types/Project";
import { 
  RiFileTextLine, 
  RiMoreLine, 
  RiEditLine, 
  RiDeleteBinLine,
  RiFileCopyLine,
  RiDownloadLine 
} from "@remixicon/react";
import { useState } from "react";

interface AllFilesTableProps {
  files: Project[];
  onDelete?: (projectId: string) => void;
  onDuplicate?: (projectId: string) => void;
}

export const AllFilesTable = ({ files, onDelete, onDuplicate }: AllFilesTableProps) => {
  const navigate = useNavigate();
  const { formatDate } = useFormattedDate();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const handleFileClick = (project: Project) => {
    navigate(`/editor/${project.id}`);
  };

  const handleMenuClick = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === projectId ? null : projectId);
  };

  const handleAction = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
    setOpenMenuId(null);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descripción
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actualizado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Creado
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {files.map((file) => (
              <tr
                key={file.id}
                onClick={() => handleFileClick(file)}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <RiFileTextLine className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
                        {file.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        ID: {file.id.slice(-8)}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-xs truncate">
                    {file.description || "Sin descripción"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(file.updatedAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(file.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                  <button
                    onClick={(e) => handleMenuClick(e, file.id)}
                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                  >
                    <RiMoreLine className="h-5 w-5" />
                  </button>
                  
                  {openMenuId === file.id && (
                    <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                      <div className="py-1">
                        <button
                          onClick={(e) => handleAction(e, () => handleFileClick(file))}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          <RiEditLine className="h-4 w-4 mr-2" />
                          Abrir en editor
                        </button>
                        {onDuplicate && (
                          <button
                            onClick={(e) => handleAction(e, () => onDuplicate(file.id))}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <RiFileCopyLine className="h-4 w-4 mr-2" />
                            Duplicar
                          </button>
                        )}
                        <button
                          onClick={(e) => handleAction(e, () => console.log("Export:", file.id))}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          <RiDownloadLine className="h-4 w-4 mr-2" />
                          Exportar
                        </button>
                        <hr className="my-1" />
                        {onDelete && (
                          <button
                            onClick={(e) => handleAction(e, () => onDelete(file.id))}
                            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                          >
                            <RiDeleteBinLine className="h-4 w-4 mr-2" />
                            Eliminar
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Click outside to close menu */}
      {openMenuId && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setOpenMenuId(null)}
        />
      )}
    </div>
  );
};
