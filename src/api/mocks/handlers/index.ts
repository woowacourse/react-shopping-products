import { getProductsHandler } from './productHandlers';
import {
  getCartHandler,
  postCartHandler,
  deleteCartHandler,
  patchCartHandler,
} from './cartHandlers';

export const handlers = [
  getProductsHandler,
  getCartHandler,
  postCartHandler,
  deleteCartHandler,
  patchCartHandler,
];
