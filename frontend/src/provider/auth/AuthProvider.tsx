/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, type ReactNode } from "react";
import AuthContext, {
  type AuthContextType,
} from "../../context/auth/AuthContext";
import type { User } from "../../types/user/User";

import { apiService } from "../../services/api";
import type { LoginRequest } from "../../types/auth/LoginRequest";
import type { RegisterRequest } from "../../types/auth/RegisterRequest";
import type { ApiError } from "../../types/api/ApiError";
import toast from "react-hot-toast";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshToken = async (): Promise<void> => {
    const refreshTokenValue = apiService.auth.getRefreshToken();
    if (!refreshTokenValue) {
      logout();
      return;
    }
    try {
      const response = await apiService.auth.refreshToken(refreshTokenValue);
      apiService.auth.storeTokens(response.accessToken, response.refreshToken);
      await fetchUserProfile();
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout();
    }
  };

  const fetchUserProfile = async (): Promise<void> => {
    try {
      const userData = await apiService.user.getProfile();
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      logout();
    }
  };

  const login = async (data: LoginRequest): Promise<void> => {
    try {
      const response = await apiService.auth.login(data);

      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);

      await fetchUserProfile();
      toast.success("¡Inicio de sesión exitoso!");
    } catch (error) {
      const apiError = error as ApiError;
      console.error("Login error:", apiError);
      toast.error(apiError.message || "Error al iniciar sesión");
      throw error;
    }
  };

  const register = async (data: RegisterRequest): Promise<void> => {
    try {
      const response = await apiService.auth.register(data);

      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);

      await fetchUserProfile();
      toast.success("¡Registro exitoso!");
    } catch (error) {
      const apiError = error as ApiError;
      console.error("Register error:", apiError);
      toast.error(apiError.message || "Error al registrarse");
      throw error;
    }
  };

  const logout = (): void => {
    apiService.auth.clearTokens();
    setUser(null);
    toast.success("Sesión cerrada correctamente");
  };

  const refetchUser = async (): Promise<void> => {
    await fetchUserProfile();
  };

  // Check token on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setLoading(false);
        return;
      }

      if (apiService.auth.isTokenExpired(token)) {
        await refreshToken();
      } else {
        await fetchUserProfile();
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  // Auto refresh token
  useEffect(() => {
    if (!user) return;

    const checkTokenExpiry = setInterval(async () => {
      const token = apiService.auth.getAccessToken();
      if (token && apiService.auth.isTokenExpired(token)) {
        await refreshToken();
      }
    }, 60000); // Check every minute

    return () => clearInterval(checkTokenExpiry);
  }, [user]);

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshToken,
    refetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
