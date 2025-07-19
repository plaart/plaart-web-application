import { adminService } from "./adminService";
import { authService } from "./authService";
import { managerService } from "./managerService";
import { testService } from "./testService";
import { userService } from "./userService";

export const apiService = {
  auth: authService,
  user: userService,
  manager: managerService,
  admin: adminService,
  test: testService,
};
