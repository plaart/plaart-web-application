import { API_BASE_URL_LOCAL } from "../constant";
import { getAuthHeaders } from "./config";
import type { ApiError } from "../types/api/ApiError";

export class HttpClient {
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw {
        timestamp: new Date().toISOString(),
        status: response.status,
        error: errorData.error || "Unknown Error",
        message: errorData.message || "An error occurred",
        validationErrors: errorData.validationErrors || {},
      } as ApiError;
    }
    return response.status === 204 ? ({} as T) : response.json();
  }
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL_LOCAL}${endpoint}`, {
        headers: getAuthHeaders(),
        ...options,
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof TypeError) {
        throw {
          message:
            "Error de conexión. Verifica que el servidor esté ejecutándose.",
          status: 0,
        } as ApiError;
      }
      throw error;
    }
  }
}

export const httpClient = new HttpClient();
