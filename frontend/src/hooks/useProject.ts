/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import type {
  Project,
  ProjectRequest,
  ProjectStats,
  UseProjectsOptions,
} from "../types/Project";
import { apiService } from "../services/api";
import { getErrorMessage, type ErrorType } from "../types/types";

export const useProjects = (
  userId: string,
  options: UseProjectsOptions = {}
) => {
  const {
    loadRecentProjects = false,
    recentProjectsLimit = 5,
    loadStats = false,
    autoLoad = true,
  } = options;

  // Estados principales
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  // Estados para proyectos recientes
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [recentLoading, setRecentLoading] = useState(false);
  const [recentError, setRecentError] = useState<string | null>(null);

  // Estados para estadísticas
  const [stats, setStats] = useState<ProjectStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [statsError, setStatsError] = useState<string | null>(null);

  // Obtener todos los proyectos
  const fetchProjects = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);

      const [projectsData, count] = await Promise.all([
        apiService.project.getProjectsList(userId),
        apiService.project.getCount(userId),
      ]);

      setProjects(projectsData);
      setTotalCount(count);
    } catch (err: ErrorType) {
      setError(getErrorMessage(err) || "Error al cargar proyectos");
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Obtener proyectos recientes
  const fetchRecentProjects = useCallback(async () => {
    if (!userId || !loadRecentProjects) return;

    try {
      setRecentLoading(true);
      setRecentError(null);

      const recentData = await apiService.project.getRecentProjects(
        userId,
        recentProjectsLimit
      );
      setRecentProjects(recentData);
    } catch (err: ErrorType) {
      setRecentError(
        getErrorMessage(err) || "Error al cargar proyectos recientes"
      );
    } finally {
      setRecentLoading(false);
    }
  }, [userId, loadRecentProjects, recentProjectsLimit]);

  // Obtener estadísticas
  const fetchStats = useCallback(async () => {
    if (!userId || !loadStats) return;

    try {
      setStatsLoading(true);
      setStatsError(null);

      const projectStats = await apiService.project.getProjectStats(userId);
      setStats(projectStats);
    } catch (err: ErrorType) {
      setStatsError(getErrorMessage(err) || "Error al cargar estadísticas");
    } finally {
      setStatsLoading(false);
    }
  }, [userId, loadStats]);

  // Crear nuevo proyecto
  const createProject = async (data: ProjectRequest) => {
    try {
      setError(null);

      const newProject = await apiService.project.createAndGetProject(
        userId,
        data
      );

      // Actualizar estados locales
      setProjects((prev) => [newProject, ...prev]);
      setTotalCount((prev) => prev + 1);

      // Actualizar proyectos recientes si están habilitados
      if (loadRecentProjects) {
        setRecentProjects((prev) => [
          newProject,
          ...prev.slice(0, recentProjectsLimit - 1),
        ]);
      }

      // Actualizar estadísticas si están habilitadas
      if (loadStats && stats) {
        setStats((prev) =>
          prev
            ? {
                ...prev,
                totalProjects: prev.totalProjects + 1,
                recentProjects: [
                  newProject,
                  ...prev.recentProjects.slice(0, 4),
                ],
              }
            : null
        );
      }

      return newProject;
    } catch (err: ErrorType) {
      setError(getErrorMessage(err) || "Error al crear proyecto");
      throw err;
    }
  };

  // Actualizar proyecto existente
  const updateProject = async (projectId: string, data: ProjectRequest) => {
    try {
      setError(null);

      const updatedProject = await apiService.project.updateAndGetProject(
        projectId,
        userId,
        data
      );

      // Actualizar en la lista principal
      setProjects((prev) =>
        prev.map((p) => (p.id === projectId ? updatedProject : p))
      );

      // Actualizar en proyectos recientes si existe
      if (loadRecentProjects) {
        setRecentProjects((prev) =>
          prev.map((p) => (p.id === projectId ? updatedProject : p))
        );
      }

      // Actualizar en estadísticas si existe
      if (loadStats && stats) {
        setStats((prev) =>
          prev
            ? {
                ...prev,
                recentProjects: prev.recentProjects.map((p) =>
                  p.id === projectId ? updatedProject : p
                ),
              }
            : null
        );
      }

      return updatedProject;
    } catch (err: ErrorType) {
      setError(getErrorMessage(err) || "Error al actualizar proyecto");
      throw err;
    }
  };

  // Eliminar proyecto
  const deleteProject = async (projectId: string) => {
    try {
      setError(null);

      const response = await apiService.project.deleteProject(
        projectId,
        userId
      );

      if (response.success) {
        // Remover de la lista principal
        setProjects((prev) => prev.filter((p) => p.id !== projectId));
        setTotalCount((prev) => Math.max(0, prev - 1));

        // Remover de proyectos recientes
        if (loadRecentProjects) {
          setRecentProjects((prev) => prev.filter((p) => p.id !== projectId));
        }

        // Actualizar estadísticas
        if (loadStats && stats) {
          setStats((prev) =>
            prev
              ? {
                  ...prev,
                  totalProjects: Math.max(0, prev.totalProjects - 1),
                  recentProjects: prev.recentProjects.filter(
                    (p) => p.id !== projectId
                  ),
                }
              : null
          );
        }

        return true;
      } else {
        throw new Error(response.message || "Error al eliminar proyecto");
      }
    } catch (err: ErrorType) {
      setError(getErrorMessage(err) || "Error al eliminar proyecto");
      throw err;
    }
  };

  // Buscar proyectos
  const searchProjects = async (searchTerm: string) => {
    try {
      setLoading(true);
      setError(null);

      if (!searchTerm.trim()) {
        await fetchProjects();
        return;
      }

      const results = await apiService.project.searchAndGetProjects(
        userId,
        searchTerm
      );
      setProjects(results);
    } catch (err: ErrorType) {
      setError(getErrorMessage(err) || "Error en búsqueda");
      console.error("Error searching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  // Limpiar búsqueda
  const clearSearch = () => {
    fetchProjects();
  };

  // Duplicar proyecto
  const duplicateProject = async (projectId: string, newName?: string) => {
    try {
      setError(null);

      const duplicatedProject = await apiService.project.duplicateProject(
        projectId,
        userId,
        newName
      );

      // Añadir a la lista principal
      setProjects((prev) => [duplicatedProject, ...prev]);
      setTotalCount((prev) => prev + 1);

      // Añadir a proyectos recientes
      if (loadRecentProjects) {
        setRecentProjects((prev) => [
          duplicatedProject,
          ...prev.slice(0, recentProjectsLimit - 1),
        ]);
      }

      // Actualizar estadísticas
      if (loadStats && stats) {
        setStats((prev) =>
          prev
            ? {
                ...prev,
                totalProjects: prev.totalProjects + 1,
                recentProjects: [
                  duplicatedProject,
                  ...prev.recentProjects.slice(0, 4),
                ],
              }
            : null
        );
      }

      return duplicatedProject;
    } catch (err: ErrorType) {
      setError(getErrorMessage(err) || "Error al duplicar proyecto");
      throw err;
    }
  };

  // Eliminar múltiples proyectos
  const deleteMultipleProjects = async (projectIds: string[]) => {
    try {
      setError(null);

      const results = await apiService.project.deleteMultipleProjects(
        projectIds,
        userId
      );

      if (results.success.length > 0) {
        // Remover de la lista principal
        setProjects((prev) =>
          prev.filter((p) => !results.success.includes(p.id))
        );
        setTotalCount((prev) => Math.max(0, prev - results.success.length));

        // Remover de proyectos recientes
        if (loadRecentProjects) {
          setRecentProjects((prev) =>
            prev.filter((p) => !results.success.includes(p.id))
          );
        }

        // Actualizar estadísticas
        if (loadStats && stats) {
          setStats((prev) =>
            prev
              ? {
                  ...prev,
                  totalProjects: Math.max(
                    0,
                    prev.totalProjects - results.success.length
                  ),
                  recentProjects: prev.recentProjects.filter(
                    (p) => !results.success.includes(p.id)
                  ),
                }
              : null
          );
        }
      }

      if (results.failed.length > 0) {
        setError(
          `No se pudieron eliminar ${results.failed.length} proyecto(s)`
        );
      }

      return results;
    } catch (err: ErrorType) {
      setError(getErrorMessage(err) || "Error al eliminar proyectos");
      throw err;
    }
  };

  // Obtener proyecto específico
  const getProject = async (projectId: string) => {
    try {
      setError(null);
      return await apiService.project.getProject(projectId, userId);
    } catch (err: ErrorType) {
      setError(getErrorMessage(err) || "Error al obtener proyecto");
      throw err;
    }
  };

  // Refrescar todos los datos
  const refetchAll = useCallback(async () => {
    const promises = [fetchProjects()];

    if (loadRecentProjects) {
      promises.push(fetchRecentProjects());
    }

    if (loadStats) {
      promises.push(fetchStats());
    }

    await Promise.all(promises);
  }, [
    fetchProjects,
    fetchRecentProjects,
    fetchStats,
    loadRecentProjects,
    loadStats,
  ]);

  // Limpiar todos los errores
  const clearAllErrors = () => {
    setError(null);
    setRecentError(null);
    setStatsError(null);
  };

  // Cargar datos inicialmente
  useEffect(() => {
    if (autoLoad && userId) {
      refetchAll();
    }
  }, [userId, autoLoad, refetchAll]);

  // Estado derivado
  const hasProjects = projects.length > 0;
  const isEmpty = projects.length === 0 && !loading;
  const isAnyLoading = loading || recentLoading || statsLoading;
  const hasAnyError = error || recentError || statsError;

  return {
    // Estados principales
    projects,
    loading,
    error,
    totalCount,

    // Proyectos recientes (solo si loadRecentProjects = true)
    recentProjects: loadRecentProjects ? recentProjects : [],
    recentLoading: loadRecentProjects ? recentLoading : false,
    recentError: loadRecentProjects ? recentError : null,

    // Estadísticas (solo si loadStats = true)
    stats: loadStats ? stats : null,
    statsLoading: loadStats ? statsLoading : false,
    statsError: loadStats ? statsError : null,

    // Acciones CRUD básicas
    createProject,
    updateProject,
    deleteProject,
    getProject,

    // Acciones de búsqueda
    searchProjects,
    clearSearch,

    // Acciones avanzadas
    duplicateProject,
    deleteMultipleProjects,

    // Refrescar datos
    refetch: fetchProjects,
    refetchRecent: loadRecentProjects ? fetchRecentProjects : undefined,
    refetchStats: loadStats ? fetchStats : undefined,
    refetchAll,

    // Utilidades
    clearError: () => setError(null),
    clearRecentError: () => setRecentError(null),
    clearStatsError: () => setStatsError(null),
    clearAllErrors,

    // Estado derivado
    hasProjects,
    isEmpty,
    isAnyLoading,
    hasAnyError,
  } as const;
};
