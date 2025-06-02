import { setupServer } from 'msw/node';
import { handlers } from '../src/mocks/handlers';
import '@testing-library/jest-dom';

const server = setupServer(...handlers);

export { server };
