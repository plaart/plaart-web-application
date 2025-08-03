import { endpoints } from "../../api/endpoints";
import { httpClient } from "../../api/httpConfig";
import type {
  Project,
  ProjectFilters,
  ProjectRequest,
  ProjectResponse,
  ProjectStats,
} from "../../types/Project";

export const projectService = {
  getAllProjects(userId: string): Promise<ProjectResponse> {
    return httpClient.request(endpoints.project.getAll(userId));
  },

  getProjectById(id: string, userId: string): Promise<ProjectResponse> {
    return httpClient.request(endpoints.project.getById(id, userId));
  },

  createProject(
    userId: string,
    data: ProjectRequest
  ): Promise<ProjectResponse> {
    return httpClient.request(endpoints.project.create(userId), {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  updateProject(
    id: string,
    userId: string,
    data: ProjectRequest
  ): Promise<ProjectResponse> {
    return httpClient.request(endpoints.project.update(id, userId), {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  deleteProject(id: string, userId: string): Promise<ProjectResponse> {
    return httpClient.request(endpoints.project.delete(id, userId), {
      method: "DELETE",
    });
  },

  searchProjects(userId: string, searchTerm: string): Promise<ProjectResponse> {
    return httpClient.request(endpoints.project.search(userId, searchTerm));
  },

  getProjectCount(userId: string): Promise<ProjectResponse> {
    return httpClient.request(endpoints.project.count(userId));
  },

  async getProjectsList(userId: string): Promise<Project[]> {
    const response = await this.getAllProjects(userId);
    if (response.success && response.projects) {
      return response.projects;
    }
    throw new Error(response.message || "Error al obtener proyectos");
  },

  async getProject(id: string, userId: string): Promise<Project> {
    const response = await this.getProjectById(id, userId);
    if (response.success && response.project) {
      return response.project;
    }
    throw new Error(response.message || "Error al obtener el proyecto");
  },

  async createAndGetProject(
    userId: string,
    data: ProjectRequest
  ): Promise<Project> {
    const response = await this.createProject(userId, data);
    if (response.success && response.project) {
      return response.project;
    }
    throw new Error(response.message || "Error al crear el proyecto");
  },
  // Actualizar proyecto y devolver solo el proyecto actualizado
  async updateAndGetProject(
    id: string,
    userId: string,
    data: ProjectRequest
  ): Promise<Project> {
    const response = await this.updateProject(id, userId, data);
    if (response.success && response.project) {
      return response.project;
    }
    throw new Error(response.message || "Error al actualizar el proyecto");
  },

  // Buscar proyectos y devolver solo la lista
  async searchAndGetProjects(
    userId: string,
    searchTerm: string
  ): Promise<Project[]> {
    const response = await this.searchProjects(userId, searchTerm);
    if (response.success && response.projects) {
      return response.projects;
    }
    throw new Error(response.message || "Error al buscar proyectos");
  },

  // Obtener solo el número de proyectos
  async getCount(userId: string): Promise<number> {
    const response = await this.getProjectCount(userId);
    if (response.success && response.count !== undefined) {
      return response.count;
    }
    throw new Error(response.message || "Error al obtener el conteo");
  },

  // Verificar si un proyecto existe
  async projectExists(id: string, userId: string): Promise<boolean> {
    try {
      await this.getProject(id, userId);
      return true;
    } catch {
      return false;
    }
  },

  // Duplicar un proyecto (crear copia)
  async duplicateProject(
    id: string,
    userId: string,
    newName?: string
  ): Promise<Project> {
    const originalProject = await this.getProject(id, userId);

    const duplicateData: ProjectRequest = {
      name: newName || `${originalProject.name} (Copia)`,
      description: originalProject.description,
    };

    return this.createAndGetProject(userId, duplicateData);
  },

  // Eliminar múltiples proyectos
  async deleteMultipleProjects(
    projectIds: string[],
    userId: string
  ): Promise<{ success: string[]; failed: string[] }> {
    const results = await Promise.allSettled(
      projectIds.map((id) => this.deleteProject(id, userId))
    );

    const success: string[] = [];
    const failed: string[] = [];

    results.forEach((result, index) => {
      if (result.status === "fulfilled" && result.value.success) {
        success.push(projectIds[index]);
      } else {
        failed.push(projectIds[index]);
      }
    });

    return { success, failed };
  },

  // Obtener proyectos recientes (últimos N proyectos por fecha de actualización)
  async getRecentProjects(
    userId: string,
    limit: number = 5
  ): Promise<Project[]> {
    const projects = await this.getProjectsList(userId);

    // Los proyectos ya vienen ordenados por updatedAt desc desde el backend
    return projects.slice(0, limit);
  },

  // Filtrar proyectos por rango de fechas
  async getProjectsByDateRange(
    userId: string,
    startDate: string,
    endDate: string
  ): Promise<Project[]> {
    const projects = await this.getProjectsList(userId);

    return projects.filter((project) => {
      const createdAt = new Date(project.createdAt);
      const start = new Date(startDate);
      const end = new Date(endDate);

      return createdAt >= start && createdAt <= end;
    });
  },
  // Obtener estadísticas completas de proyectos
  async getProjectStats(userId: string): Promise<ProjectStats> {
    const [projects, totalCount] = await Promise.all([
      projectService.getProjectsList(userId),
      projectService.getCount(userId),
    ]);

    const recentProjects = projects.slice(0, 5);

    // Agrupar proyectos por mes
    const projectsByMonth = projects.reduce((acc, project) => {
      const month = new Date(project.createdAt).toISOString().slice(0, 7); // YYYY-MM
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    return {
      totalProjects: totalCount,
      recentProjects,
      projectsByMonth,
    };
  },

  // Buscar proyectos con filtros avanzados
  async searchProjectsWithFilters(
    userId: string,
    filters: ProjectFilters
  ): Promise<Project[]> {
    let projects: Project[];

    if (filters.searchTerm) {
      projects = await projectService.searchAndGetProjects(
        userId,
        filters.searchTerm
      );
    } else {
      projects = await projectService.getProjectsList(userId);
    }

    // Aplicar filtro de fechas si existe
    if (filters.startDate || filters.endDate) {
      projects = projects.filter((project) => {
        const createdAt = new Date(project.createdAt);
        const start = filters.startDate
          ? new Date(filters.startDate)
          : new Date(0);
        const end = filters.endDate ? new Date(filters.endDate) : new Date();

        return createdAt >= start && createdAt <= end;
      });
    }

    // Aplicar límite si existe
    if (filters.limit) {
      projects = projects.slice(0, filters.limit);
    }

    return projects;
  },
};
