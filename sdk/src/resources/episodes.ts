import type { APIClient } from "../core/client.js";

export class Episodes {
  private apiClient: APIClient;

  constructor(apiClient: APIClient) {
    this.apiClient = apiClient;
  }

  async getById(id: number) {
    return this.apiClient.request(`/episode/${id}`);
  }
  async getAll() {
    return this.apiClient.request(`/episode`);
  }
}