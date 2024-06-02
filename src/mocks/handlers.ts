import { productsHandler } from '@mocks/handlers/products/products';
import {
  deleteCartItemHandler,
  getShoppingCartHandler,
  postCartItemHandler,
} from '@mocks/handlers/shoppingCart/shoppingCart';

export const handlers = [
  productsHandler,
  postCartItemHandler,
  getShoppingCartHandler,
  deleteCartItemHandler,
];
