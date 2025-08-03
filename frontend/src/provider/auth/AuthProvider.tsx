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
import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Función para redirigir según el rol
  const redirectByRole = (userRole: string) => {
    console.log("Redirigiendo usuario con rol:", userRole);

    switch (userRole) {
      case "ADMIN":
        console.log("Redirigiendo ADMIN a /dashboard");
        navigate("/dashboard");
        break;
      case "MANAGER":
        console.log("Redirigiendo MANAGER a /workspace");
        navigate("/workspace");
        break;
      case "USER":
        console.log("Redirigiendo USER a /workspace");
        navigate("/workspace");
        break;
      default:
        console.log("Rol no reconocido, redirigiendo a homepage");
        navigate("/");
        break;
    }
  };

  const refreshToken = async (): Promise<boolean> => {
    const refreshTokenValue = apiService.auth.getRefreshToken();
    if (!refreshTokenValue) {
      logout();
      return false;
    }
    try {
      const response = await apiService.auth.refreshToken(refreshTokenValue);
      apiService.auth.storeTokens(response.accessToken, response.refreshToken);
      const userData = await fetchUserProfile();
      return userData !== null;
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout();
      return false;
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

      // Obtener los datos del usuario
      const userData = await apiService.user.getProfile();
      setUser(userData);

      toast.success("¡Inicio de sesión exitoso!");

      console.log("Usuario logueado:", userData);
      console.log("Rol del usuario:", userData.role);

      // Redirigir según el rol del usuario
      redirectByRole(userData.role);
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

      const userData = await apiService.user.getProfile();
      setUser(userData);

      toast.success("¡Registro exitoso!");

      // Redirigir según el rol del usuario después del registro
      redirectByRole(userData.role);
    } catch (error) {
      const apiError = error as ApiError;
      console.error("Register error:", apiError);
      toast.error(apiError.message || "Error al registrarse");
      throw error;
    }
  };

  const logout = (): void => {
    apiService.auth.clearTokens();
    //setUser({});
    toast.success("Sesión cerrada correctamente");
    navigate("/");
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

      try {
        let userData;
        if (apiService.auth.isTokenExpired(token)) {
          const refreshSuccess = await refreshToken();
          if (refreshSuccess) {
            userData = user;
          }
        } else {
          userData = await fetchUserProfile();
        }

        // Solo redirigir si estamos en la homepage y hay un usuario
        const currentPath = window.location.pathname;
        console.log("Ruta actual:", currentPath);

        if (currentPath === "/" && (userData || user)) {
          const userToRedirect = userData || user;
          if (userToRedirect) {
            console.log(
              "Redirigiendo desde homepage con usuario:",
              userToRedirect.role
            );
            redirectByRole(userToRedirect.role);
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
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
