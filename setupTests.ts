import "@testing-library/jest-dom";
import { server } from "./src/mocks/server.ts";

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});
