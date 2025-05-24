import { cartHandlers } from './cart/cart.handler';
import { productHandlers } from './product/products.handler';

export const handlers = [...cartHandlers, ...productHandlers];
