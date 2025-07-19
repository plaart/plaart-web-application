export const endpoints = {
    auth: {
    register: '/auth/register',
    login: '/auth/login',
    refreshToken: '/auth/refresh-token',
  },
  user: {
    profile: '/user/profile',
  },
  manager: {
    users: '/manager/users',
    userById: (id: string) => `/manager/users/${id}`,
  },
  admin: {
    users: '/admin/users',
    userById: (id: string) => `/admin/users/${id}`,
    updateRole: (id: string, role: string) => `/admin/users/${id}/role?role=${role}`,
    enable: (id: string) => `/admin/users/${id}/enable`,
    disable: (id: string) => `/admin/users/${id}/disable`,
  },
  test: {
    public: '/test/public',
    user: '/test/user',
    manager: '/test/manager',
    admin: '/test/admin',
    managerOrAdmin: '/test/manager-or-admin',
  },
}
