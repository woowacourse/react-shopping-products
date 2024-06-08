import { deleteCartItemHandler } from '@/mocks/handlers/deleteCartItemHandler';
import { getCartListHandler } from '@/mocks/handlers/getCartListHandler';
import { getProductListHandler } from '@/mocks/handlers/getProductListHandler';
import { postCartItemHandler } from '@/mocks/handlers/postCartItemHandler';

export const handlers = [
  ...getProductListHandler,
  ...getCartListHandler,
  ...postCartItemHandler,
  ...deleteCartItemHandler,
];
