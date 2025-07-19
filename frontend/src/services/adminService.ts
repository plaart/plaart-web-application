import { endpoints } from "../api/endpoints";
import { httpClient } from "../api/httpConfig";
import type { UpdateUserRequest } from "../types/auth/UpdateUserRequest";
import type { User } from "../types/user/User";

export const adminService = {
  getAllUsers(): Promise<User[]> {
    return httpClient.request(endpoints.admin.users);
  },

  getUserById(userId: string): Promise<User> {
    return httpClient.request(endpoints.admin.userById(userId));
  },

  updateUser(userId: string, data: UpdateUserRequest): Promise<User> {
    return httpClient.request(endpoints.admin.userById(userId), {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteUser(userId: string): Promise<void> {
    return httpClient.request(endpoints.admin.userById(userId), {
      method: 'DELETE',
    });
  },

  updateUserRole(userId: string, role: string): Promise<User> {
    return httpClient.request(endpoints.admin.updateRole(userId, role), {
      method: 'PUT',
    });
  },

  enableUser(userId: string): Promise<User> {
    return httpClient.request(endpoints.admin.enable(userId), {
      method: 'PUT',
    });
  },

  disableUser(userId: string): Promise<User> {
    return httpClient.request(endpoints.admin.disable(userId), {
      method: 'PUT',
    });
  },
};
