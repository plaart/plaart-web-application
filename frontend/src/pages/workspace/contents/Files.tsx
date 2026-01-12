import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useProjects } from "../../../hooks/useProject";
import { FolderCard } from "../components/FolderCard";
import useIntl from "../../../hooks/useIntl";
import { FileCreateCard } from "../components/FileCreateCard";
import { FileCard } from "../components/FileCard";
import { CreateProjectModal } from "../components/CreateProjectModal";
import type { ProjectRequest } from "../../../types/Project";
import toast from "react-hot-toast";

// Datos mock para carpetas (mientras no implementemos carpetas en el backend)
const mockFolders = [
  { id: "1", name: "Diseños UI/UX", count: 12, color: "blue" },
  { id: "2", name: "Ilustraciones", count: 8, color: "green" },
  { id: "3", name: "Bocetos", count: 15, color: "purple" },
];

const Files = () => {
  const { t } = useIntl();
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Cargar proyectos reales del backend
  const {
    projects,
    loading,
    error,
    createProject,
    deleteProject,
    searchProjects,
    clearSearch,
    refetch
  } = useProjects(user?.id || "", {
    autoLoad: true
  });

  const handleCreateProject = async (data: ProjectRequest) => {
    if (!user?.id) {
      toast.error("Error: Usuario no autenticado");
      return;
    }

    try {
      setIsCreating(true);
      await createProject(data);
      toast.success("Proyecto creado exitosamente");
      setShowCreateModal(false);
    } catch (error) {
      toast.error("Error al crear el proyecto");
      console.error("Error creating project:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este proyecto?")) {
      try {
        await deleteProject(projectId);
        toast.success("Proyecto eliminado exitosamente");
      } catch (error) {
        toast.error("Error al eliminar el proyecto");
        console.error("Error deleting project:", error);
      }
    }
  };

  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    if (term.trim()) {
      try {
        await searchProjects(term);
      } catch (error) {
        toast.error("Error en la búsqueda");
      }
    } else {
      clearSearch();
    }
  };

  // Estados de carga
  if (loading && projects.length === 0) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Cargando archivos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          {t("workspace.content.file.header.title")}
        </h1>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar proyectos..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {searchTerm && (
            <button
              onClick={() => handleSearch("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Carpetas section */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          {t("workspace.content.file.section.folder.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {mockFolders.map((folder) => (
            <FolderCard key={folder.id} folder={folder} />
          ))}
        </div>
      </div>

      {/* Archivos section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">
            {t("workspace.content.file.section.file.title")}
          </h2>
          {searchTerm && (
            <p className="text-sm text-gray-500">
              {projects.length} resultado(s) para "{searchTerm}"
            </p>
          )}
        </div>

        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-600 mb-2">Error al cargar proyectos</p>
            <p className="text-red-500 text-sm mb-4">{error}</p>
            <button
              onClick={refetch}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Reintentar
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {projects.map((file) => (
              <FileCard 
                key={file.id} 
                file={file} 
                onDelete={handleDeleteProject}
              />
            ))}
            <FileCreateCard onClick={() => setShowCreateModal(true)} />
          </div>
        )}

        {projects.length === 0 && !loading && !error && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            {searchTerm ? (
              <>
                <p className="text-gray-500 mb-2">No se encontraron proyectos</p>
                <button
                  onClick={() => handleSearch("")}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  Limpiar búsqueda
                </button>
              </>
            ) : (
              <>
                <p className="text-gray-500 mb-2">No tienes proyectos aún</p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Crear primer proyecto
                </button>
              </>
            )}
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>

      {/* Modal para crear proyecto */}
      <CreateProjectModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateProject}
        isLoading={isCreating}
      />
    </div>
  );
};

export default Files;
