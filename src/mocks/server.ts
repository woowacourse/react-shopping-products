import { setupServer } from 'msw/node';
import { productHandlers } from './productHandlers';
import { cartItemHandlers } from './cartItemHandlers';

export const server = setupServer(...productHandlers, ...cartItemHandlers);
