import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { Project, ProjectRequest } from "../../../types/Project";
import { RiArrowRightLine, RiCloseLine, RiLoaderLine } from "@remixicon/react";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (data: ProjectRequest) => Promise<Project>;
  onNavigateToEditor: (projectId: string) => void;
}

const CreateProjectModal = ({
  isOpen,
  onClose,
  onCreateProject,
  onNavigateToEditor,
}: CreateProjectModalProps) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateProject = async () => {
    if (!projectName.trim()) return;

    try {
      setIsCreating(true);

      const projectData = {
        name: projectName.trim(),
        description: projectDescription.trim() || undefined,
      };

      const newProject = await onCreateProject(projectData);

      onClose();
      resetModal();
      onNavigateToEditor(newProject.id);
    } catch (error) {
      console.error("Error creating project:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const resetModal = () => {
    setProjectName("");
    setProjectDescription("");
    setIsCreating(false);
  };

  const handleClose = () => {
    if (!isCreating) {
      onClose();
      setTimeout(resetModal, 300);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && projectName.trim()) {
      e.preventDefault();
      handleCreateProject();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Crear Nuevo Proyecto
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Ingresa los detalles de tu proyecto
                </p>
              </div>

              <button
                onClick={handleClose}
                disabled={isCreating}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50">
                <RiCloseLine className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del proyecto *
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ej: Mi proyecto increíble"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 placeholder-gray-500"
                    disabled={isCreating}
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción (opcional)
                  </label>
                  <textarea
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="Describe brevemente tu proyecto..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 placeholder-gray-500 resize-none"
                    disabled={isCreating}
                  />
                </div>

                {/* Actions */}
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={handleClose}
                    disabled={isCreating}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 font-medium text-gray-700">
                    Cancelar
                  </button>
                  <button
                    onClick={handleCreateProject}
                    disabled={isCreating || !projectName.trim()}
                    className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center space-x-2">
                    {isCreating ? (
                      <>
                        <RiLoaderLine className="w-4 h-4 animate-spin" />
                        <span>Creando...</span>
                      </>
                    ) : (
                      <>
                        <span>Crear Proyecto</span>
                        <RiArrowRightLine className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateProjectModal;
