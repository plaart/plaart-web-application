import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useProjects } from "../../hooks/useProject";
import { useDebounce } from "../../hooks/useDebounce";
import type { Project } from "../../types/Project";

const Editor = () => {
  const { id: projectId } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { getProject } = useProjects(user?.id || "", { autoLoad: false });
  
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ⭐ Memoizar la función de carga
  const loadProject = useCallback(async () => {
    if (!projectId || !user?.id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const projectData = await getProject(projectId);
      setProject(projectData);
    } catch (err: unknown) { // ⭐ Tipo específico para error
      console.error("Error loading project:", err);
      setError("Error al cargar el proyecto");
    } finally {
      setLoading(false);
    }
  }, [projectId, user?.id, getProject]);

  // ⭐ Debounce con dependencias correctas
  const debouncedLoad = useDebounce(loadProject, 500, [projectId, user?.id]);

  useEffect(() => {
    debouncedLoad();
  }, [debouncedLoad]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!project) return <div>Proyecto no encontrado</div>;

  return (
    <div className="p-6">
      <h1>EDITOR - {project.name}</h1>
      <p>ID: {projectId}</p>
      <p>Descripción: {project.description || 'Sin descripción'}</p>
    </div>
  );
};

export default Editor;
