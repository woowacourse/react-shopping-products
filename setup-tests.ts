import { node } from './src/mocks/node';

import '@testing-library/jest-dom';
beforeAll(() => node.listen());
afterEach(() => node.resetHandlers());
afterAll(() => node.close());
