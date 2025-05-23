import { cartHandlers } from './handlers/cartHandlers';
import { productHandlers } from './handlers/productHandlers';

export const handlers = [...productHandlers, ...cartHandlers];
