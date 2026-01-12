import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useProjects } from "../../../hooks/useProject";
import HeaderActions from "../components/HeaderActions";
import SectionHeader from "../components/SectionHeader";
import useIntl from "../../../hooks/useIntl";
import { RecentFilesGrid } from "../components/RecentFilesGrid";
import { AllFilesTable } from "../components/AllFilesTable";
import { CreateProjectModal } from "../components/CreateProjectModal";
import type { ProjectRequest } from "../../../types/Project";
import toast from "react-hot-toast";

const Home = () => {
  const { t } = useIntl();
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Cargar proyectos reales del backend
  const {
    projects,
    loading,
    error,
    createProject,
    refetch,
    recentProjects,
    recentLoading
  } = useProjects(user?.id || "", {
    loadRecentProjects: true,
    recentProjectsLimit: 6,
    loadStats: true,
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

  const handleRefresh = () => {
    refetch();
    toast.success("Proyectos actualizados");
  };

  // Estados de carga
  if (loading && projects.length === 0) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Cargando proyectos...</p>
          </div>
        </div>
      </div>
    );
  }

  // Estado de error
  if (error && projects.length === 0) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 mb-2">Error al cargar proyectos</p>
            <p className="text-gray-600 text-sm mb-4">{error}</p>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          {t("workspace.content.home.header.title")}
        </h1>
        <HeaderActions 
          onCreateProject={() => setShowCreateModal(true)}
          onRefresh={handleRefresh}
          isLoading={loading}
        />
      </div>

      {/* Plantillas section */}
      <div className="mb-6">
        <SectionHeader
          title={t("workspace.content.home.main.templates.title")}
          actionText={t("workspace.content.home.main.templates.button")}
          onAction={() => setShowCreateModal(true)}
        />
        {/* TODO: Implementar plantillas */}
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <p className="text-gray-500">
            Las plantillas estarán disponibles próximamente
          </p>
        </div>
      </div>

      {/* Proyectos recientes */}
      <div className="mb-8">
        <SectionHeader 
          title={t("workspace.content.home.main.recent.title")} 
          count={recentProjects.length}
        />
        {recentLoading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          </div>
        ) : recentProjects.length > 0 ? (
          <RecentFilesGrid files={recentProjects} />
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-500">No hay proyectos recientes</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="mt-2 text-blue-600 hover:text-blue-700 text-sm"
            >
              Crear tu primer proyecto
            </button>
          </div>
        )}
      </div>

      {/* Todos los proyectos */}
      <div>
        <SectionHeader
          title={t("workspace.content.home.main.all.title")}
          actionText={t("workspace.content.home.main.all.sort")}
          count={projects.length}
        />
        {projects.length > 0 ? (
          <AllFilesTable files={projects} />
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-500 mb-2">No tienes proyectos aún</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Crear nuevo proyecto
            </button>
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

export default Home;
