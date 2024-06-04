import { setupWorker } from 'msw/browser';
import { productHandlers } from './productHandlers';
import { cartItemHandlers } from './cartItemHandlers';

export const worker = setupWorker(...productHandlers, ...cartItemHandlers);
