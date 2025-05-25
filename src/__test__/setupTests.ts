import "@testing-library/jest-dom";
import { afterAll, afterEach, beforeAll, vi } from "vitest";
import { server } from "../mocks/server";
import { cleanup } from "@testing-library/react";

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  vi.resetAllMocks();
  cleanup();
});
afterAll(() => server.close());
