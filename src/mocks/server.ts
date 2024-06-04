import { setupServer } from 'msw/node';
import { cartItemHandlers } from './handlers/cartItemHandlers';
import { productHandlers } from './handlers/productHandlers';

export const server = setupServer(...cartItemHandlers, ...productHandlers);
