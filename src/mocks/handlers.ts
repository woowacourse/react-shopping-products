import { productsHandler } from '@mocks/handlers/products/products';
import {
  deleteCartItemHandler,
  getShoppingCartHandler,
  patchCartItemHandler,
  postCartItemHandler,
} from '@mocks/handlers/shoppingCart/shoppingCart';

export const handlers = [
  productsHandler,
  postCartItemHandler,
  getShoppingCartHandler,
  deleteCartItemHandler,
  patchCartItemHandler,
];
