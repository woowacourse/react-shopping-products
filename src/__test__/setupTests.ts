import "@testing-library/jest-dom";
import { afterAll, afterEach, beforeAll, vi } from "vitest";
import { server } from "../mocks/server";
import { cleanup } from "@testing-library/react";

beforeEach(() => vi.resetAllMocks());
beforeAll(() => server.listen());
afterEach(() => {
  vi.resetAllMocks();
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());
