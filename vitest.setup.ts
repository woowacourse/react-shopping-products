import { beforeAll, afterEach, afterAll, vi } from 'vitest';
import { server } from './src/mocks/server';

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

vi.mock('brgndyy-react-modal/dist/style.css', () => {
  return {};
});
