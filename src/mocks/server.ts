import { setupServer } from 'msw/node';

import handlers from './handlers/products';

const server = setupServer(...handlers);

export default server;
