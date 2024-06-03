import { deleteCartItemHandler } from '@/mocks/handlers/deleteCartItemHandler';
import { getProductListHandler } from '@/mocks/handlers/getProductListHandler';
import { postCartItemHandler } from '@/mocks/handlers/postCartItemHandler';

export const handlers = [
  ...getProductListHandler,
  ...postCartItemHandler,
  ...deleteCartItemHandler,
];
