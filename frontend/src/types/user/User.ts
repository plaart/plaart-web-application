export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: "USER" | "ADMIN" | "MANAGER";
  emailVerifield: boolean;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;
}
