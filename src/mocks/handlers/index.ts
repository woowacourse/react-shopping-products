import { cartItemsHandlers } from './cartItems';
import { productsHandlers } from './products';

export const handlers = [...productsHandlers, ...cartItemsHandlers];
