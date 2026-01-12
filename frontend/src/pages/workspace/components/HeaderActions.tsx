import { RiAddLine, RiRefreshLine } from "@remixicon/react";

interface HeaderActionsProps {
  onCreateProject: () => void;
  onRefresh: () => void;
  isLoading?: boolean;
}

const HeaderActions = ({ onCreateProject, onRefresh, isLoading = false }: HeaderActionsProps) => {
  return (
    <div className="flex space-x-3">
      <button
        onClick={onRefresh}
        disabled={isLoading}
        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
      >
        <RiRefreshLine className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        <span>Actualizar</span>
      </button>
      <button
        onClick={onCreateProject}
        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <RiAddLine className="h-4 w-4" />
        <span>Nuevo proyecto</span>
      </button>
    </div>
  );
};

export default HeaderActions;
