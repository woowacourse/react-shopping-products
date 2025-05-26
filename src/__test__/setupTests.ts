import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import { server } from "../mocks/server";

beforeEach(() => vi.resetAllMocks());
beforeAll(() => server.listen());
afterEach(() => {
  vi.resetAllMocks();
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());
