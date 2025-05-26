import { cartHandlers } from './cartHandler';
import { productHandlers } from './productHandlers';

export const handlers = [...productHandlers, ...cartHandlers];
