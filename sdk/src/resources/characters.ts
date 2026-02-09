import { type APIClient } from "../core/client.js";
import type { PaginatedResponse } from "../types/api.js";
import { type Character, type CharacterSearchQuery } from "../types/characters.js";

export class Characters {
  private apiClient: APIClient;

  constructor(apiClient: APIClient) {
    this.apiClient = apiClient;
  }

  async getById(id: number) {
    return this.apiClient.request<Character>(`/character/${id}`);
  }
  async getAll() {
    return this.apiClient.request<PaginatedResponse<Character>>(`/character`);
  }
  async search(query: CharacterSearchQuery) {
    return this.apiClient.request<PaginatedResponse<Character>>(`/character`, {
      queryParams: query,
    });
  }
}