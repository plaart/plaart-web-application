import { endpoints } from "../../api/endpoints";
import { httpClient } from "../../api/httpConfig";
import type { User } from "../../types/user/User";

export const managerService = {
  getAllUsers(): Promise<User[]> {
    return httpClient.request(endpoints.manager.users);
  },

  getUserById(userId: string): Promise<User> {
    return httpClient.request(endpoints.manager.userById(userId));
  },
};
