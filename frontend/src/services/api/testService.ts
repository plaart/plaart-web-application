import { endpoints } from "../../api/endpoints";
import { httpClient } from "../../api/httpConfig";
import type { TestResponse } from "../../types/api/TestResponse";

export const testService = {
  testPublic(): Promise<TestResponse> {
    return httpClient.request(endpoints.test.public);
  },

  testUser(): Promise<TestResponse> {
    return httpClient.request(endpoints.test.user);
  },

  testManager(): Promise<TestResponse> {
    return httpClient.request(endpoints.test.manager);
  },

  testAdmin(): Promise<TestResponse> {
    return httpClient.request(endpoints.test.admin);
  },

  testManagerOrAdmin(): Promise<TestResponse> {
    return httpClient.request(endpoints.test.managerOrAdmin);
  },
};
