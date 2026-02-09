import { beforeEach, describe, expect, it, jest } from '@jest/globals'

import { Characters } from "../resources/characters.js";
import { mockClient } from './utils.js';
import type { CharacterSearchQuery } from '../types/characters.js';

describe("Characters Resource", () => {
  let charactersResource: Characters;

  beforeEach(() => {
    charactersResource = new Characters(mockClient as any);
    jest.clearAllMocks();
  });

  it("should fetch character by ID", async () => {
    const mockCharacter = { id: 1, name: "Rick Sanchez" };
    mockClient.request.mockResolvedValueOnce(mockCharacter);

    const character = await charactersResource.getById(1);

    expect(mockClient.request).toHaveBeenCalledWith("/character/1");
    expect(character).toEqual(mockCharacter);
  });

  it("should fetch all characters", async () => {
    const mockResponse = {
      info: { count: 1, pages: 1, next: null, prev: null },
      results: [{ id: 1, name: "Rick Sanchez" }],
    };
    mockClient.request.mockResolvedValueOnce(mockResponse);

    const response = await charactersResource.getAll();

    expect(mockClient.request).toHaveBeenCalledWith("/character");
    expect(response).toEqual(mockResponse); 
  });

  it("should search characters with query", async () => {
    const mockResponse = {
      info: { count: 1, pages: 1, next: null, prev: null },
      results: [{ id: 1, name: "Rick Sanchez" }],
    };
    mockClient.request.mockResolvedValueOnce(mockResponse);

    const query: CharacterSearchQuery = {
      name: "Rick",
      gender: "male",
      species: "human",
      status: "alive",
    };
    const response = await charactersResource.search(query);

    expect(mockClient.request).toHaveBeenCalledWith("/character", {
      queryParams: query,
    });
    expect(response).toEqual(mockResponse); 
  });
})