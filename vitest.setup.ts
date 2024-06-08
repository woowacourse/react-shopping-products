import { resetDB } from './src/mocks/handlers';
import { server } from './src/mocks/node';

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  server.resetHandlers();
  resetDB();
});

afterAll(() => {
  server.close();
});
