import "@testing-library/jest-dom";
import "@testing-library/react";
import "vitest";
import { server } from "./mocks/node";

// MSW 활성화
process.env.VITE_APP_USE_MSW = "true";

// Establish API mocking before all tests
beforeAll(async () => {
  await server.listen({ onUnhandledRequest: "error" });
});

// Reset handlers after each test
afterEach(() => server.resetHandlers());

afterAll(() => server.close());
