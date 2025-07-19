import { createContext } from "react";
import type { User } from "../../types/user/User";
import type { LoginRequest } from "../../types/auth/LoginRequest";
import type { RegisterRequest } from "../../types/auth/RegisterRequest";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
