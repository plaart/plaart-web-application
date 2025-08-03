/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import useIntl from "../../../hooks/useIntl";
import type { ProjectRequest } from "../../../types/Project";
import { useProjects } from "../../../hooks/useProject";
import { useAuth } from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import type { ErrorType } from "../../../types/types";
import { getErrorMessage } from "../../../types/types";
import { useLogger } from "../../../hooks/useLogger";
import CreateProjectModal from "./CreateProjectModal";
import { useNavigate } from "react-router-dom";

const HeaderActions = () => {
  const { t } = useIntl();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createProject } = useProjects(user?.id || "");
  const logger = useLogger();

  const handleCreateProject = async (projectData: ProjectRequest) => {
    try {
      const newProject = await createProject({
        name: projectData.name,
        description: projectData.description,
      });
      toast.success("Nuevo proyecto creado");
      logger.info("Nuevo proyecto creado");
      return newProject;
    } catch (err: ErrorType) {
      const errorMessage = getErrorMessage(err);
      toast.error("Error creando proyecto");
      logger.error("Error creando proyecto", { error: errorMessage });
      throw err;
    }
  };

  const handleNavigateToEditor = (projectId: string) => {
    navigate(`/editor/${projectId}`);
    logger.info("Navegando al editor", { projectId });
  };

  return (
    <>
      <div className="flex space-x-3">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => setIsModalOpen(true)}>
          {t("workspace.content.home.header.actionBtn")}
        </button>
      </div>
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateProject={handleCreateProject}
        onNavigateToEditor={handleNavigateToEditor}
      />
    </>
  );
};

export default HeaderActions;
