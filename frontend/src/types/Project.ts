interface ProjectRequest {
  name: string;
  description?: string;
}

interface ProjectResponse {
  success: boolean;
  message: string;
  project?: Project;
  projects?: Project[];
  count?: number;
  userId?: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  userId?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectFilters {
  searchTerm?: string;
  startDate?: string;
  endDate?: string;
  limit?: number;
}

interface ProjectStats {
  totalProjects: number;
  recentProjects: Project[];
  projectsByMonth: { [key: string]: number };
}

interface UseProjectsOptions {
  loadRecentProjects?: boolean;
  recentProjectsLimit?: number;
  loadStats?: boolean;
  autoLoad?: boolean;
}

// Tipos adicionales
export type {
  ProjectResponse,
  Project,
  ProjectFilters,
  ProjectStats,
  ProjectRequest,
  UseProjectsOptions,
};
