import { APIClient } from "./core/client.js";
import { Characters } from "./resources/characters.js";

interface RickAndMortyAPIConfig {
  baseUrl?: string;
}
export class RickAndMortyAPI {
  private apiClient: APIClient;
  public characters: Characters;

  constructor({ baseUrl }: RickAndMortyAPIConfig = {}) {
    this.apiClient = new APIClient({ baseUrl: baseUrl || "https://rickandmortyapi.com/api" });
    this.characters = new Characters(this.apiClient);
  }
}