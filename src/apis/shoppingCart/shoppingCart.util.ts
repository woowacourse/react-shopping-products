import { CartItemsEndpointParams } from '@apis/shoppingCart/shoppingCart.type';
import {
  DEFAULT_SIZE,
  INIT_PAGE,
} from '@hooks/product/useProductsWithPagination/useProductsWithPagination.constant';
import { generateQueryParams } from '@utils/queryString';

export const getCartItemsEndpoint = ({
  page = INIT_PAGE,
  size = DEFAULT_SIZE,
}: CartItemsEndpointParams): string => {
  const baseEndpoint = 'cart-items';

  const queryString = generateQueryParams({ page, size }).toString();

  return `${baseEndpoint}?${queryString}`;
};
