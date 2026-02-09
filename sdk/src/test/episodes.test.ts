import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import { Episodes } from "../resources/episodes.js";
import { mockClient } from "./utils.js";

describe("Episodes", () => {
  let episodesResource: Episodes;

  beforeEach(() => {
    episodesResource = new Episodes(mockClient as any);
    jest.clearAllMocks();
  });

  it("should fetch episode by ID", async () => {
    const mockEpisode = { id: 1, name: "Pilot" };
    mockClient.request.mockResolvedValueOnce(mockEpisode);

    const episode = await episodesResource.getById(1);

    expect(mockClient.request).toHaveBeenCalledWith("/episode/1");
    expect(episode).toEqual(mockEpisode);
  });

  it("should fetch all episodes", async () => {
    const mockResponse = {
      info: { count: 1, pages: 1, next: null, prev: null },
      results: [{ id: 1, name: "Pilot" }],
    };
    mockClient.request.mockResolvedValueOnce(mockResponse);

    const response = await episodesResource.getAll();

    expect(mockClient.request).toHaveBeenCalledWith("/episode");
    expect(response).toEqual(mockResponse);
  });
});