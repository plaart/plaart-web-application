import { jwtDecode } from "jwt-decode";
import { endpoints } from "../../api/endpoints";
import { httpClient } from "../../api/httpConfig";
import type { AuthResponse } from "../../types/auth/AuthResponse";
import type { LoginRequest } from "../../types/auth/LoginRequest";
import type { RegisterRequest } from "../../types/auth/RegisterRequest";
import type { JWTPayload } from "../../types/auth/JWTPayload";

export const authService = {
  register(data: RegisterRequest): Promise<AuthResponse> {
    return httpClient.request(endpoints.auth.register, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  login(data: LoginRequest): Promise<AuthResponse> {
    return httpClient.request(endpoints.auth.login, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  refreshToken(refreshToken: string): Promise<AuthResponse> {
    return httpClient.request(endpoints.auth.refreshToken, {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    });
  },
  clearTokens(): void {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },
  getAccessToken(): string | null {
    return localStorage.getItem("accessToken");
  },
  getRefreshToken(): string | null {
    return localStorage.getItem("refreshToken");
  },
  storeTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  },
  isTokenExpired(token: string): boolean {
    try {
      const decoded: JWTPayload = jwtDecode(token);
      return decoded.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  },
};
