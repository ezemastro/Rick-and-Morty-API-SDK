import { jest } from "@jest/globals";

export const mockClient = {
  request: jest.fn<(...args: any[]) => Promise<any>>(),
}