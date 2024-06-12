import { deleteCartItemHandler } from '@/mocks/handlers/deleteCartItemHandler';
import { getProductListHandler } from '@/mocks/handlers/getProductListHandler';
import { postCartItemHandler } from '@/mocks/handlers/postCartItemHandler';
import { getCartItemsHandler } from './getCartItemsHandler';

export const handlers = [
  ...getProductListHandler,
  ...postCartItemHandler,
  ...getCartItemsHandler,
  ...deleteCartItemHandler,
];
