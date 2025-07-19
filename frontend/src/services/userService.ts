import { endpoints } from "../api/endpoints";
import { httpClient } from "../api/httpConfig";
import type { UpdateUserRequest } from "../types/auth/UpdateUserRequest";
import type { User } from "../types/user/User";

export const userService = {
  getProfile(): Promise<User> {
    return httpClient.request(endpoints.user.profile);
  },
  updateProfile(data: UpdateUserRequest): Promise<User> {
    return httpClient.request(endpoints.user.profile, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  deleteProfile(): Promise<void> {
    return httpClient.request(endpoints.user.profile, {
      method: 'DELETE',
    });
  },
};
