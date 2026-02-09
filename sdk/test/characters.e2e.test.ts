import { describe, it, expect } from '@jest/globals';
import type { Characters } from '../src/resources/characters.js';
import { RickAndMortyAPI } from '../src/index.js';


describe("Characters Resource E2E", () => {
  const characterResource: Characters = new RickAndMortyAPI().characters;
  it("should fetch character by ID", async () => {
    const character = await characterResource.getById(1);

    expect(character).toHaveProperty("id", 1);
    expect(character).toHaveProperty("name", "Rick Sanchez");
  });
})