import { afterAll, beforeAll } from 'vitest';
import { server } from './mocks/server';
import { afterEach } from 'node:test';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
