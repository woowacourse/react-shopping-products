import { vi } from 'vitest';
import { server } from './src/mocks/server';

beforeAll(() => {
  const intersectionObserverMock = () => ({
    observe: () => null,
  });
  window.IntersectionObserver = vi.fn().mockImplementation(intersectionObserverMock);

  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
