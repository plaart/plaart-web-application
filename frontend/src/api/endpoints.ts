export const endpoints = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    refreshToken: "/auth/refresh-token",
  },
  user: {
    profile: "/user/profile",
  },
  manager: {
    users: "/manager/users",
    userById: (id: string) => `/manager/users/${id}`,
  },
  admin: {
    users: "/admin/users",
    userById: (id: string) => `/admin/users/${id}`,
    updateRole: (id: string, role: string) =>
      `/admin/users/${id}/role?role=${role}`,
    enable: (id: string) => `/admin/users/${id}/enable`,
    disable: (id: string) => `/admin/users/${id}/disable`,
  },
  test: {
    public: "/test/public",
    user: "/test/user",
    manager: "/test/manager",
    admin: "/test/admin",
    managerOrAdmin: "/test/manager-or-admin",
  },
  project: {
    getAll: (userId: string) => `/projects?userId=${userId}`,
    getById: (id: string, userId: string) => `/projects/${id}?userId=${userId}`,
    create: (userId: string) => `/projects?userId=${userId}`,
    update: (id: string, userId: string) => `/projects/${id}?userId=${userId}`,
    delete: (id: string, userId: string) => `/projects/${id}?userId=${userId}`,
    search: (userId: string, searchTerm: string) =>
      `/projects/search?userId=${userId}&searchTerm=${encodeURIComponent(
        searchTerm
      )}`,
    count: (userId: string) => `/projects/count?userId=${userId}`,
  },
  path: {
    home: "/",
    workspace: "/workspace",
    dashboard: "/dashboard",
    auth: {
      login: "/auth/login",
      register: "/auth/register",
    },
  },
};
