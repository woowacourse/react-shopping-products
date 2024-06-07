import { CartItemsEndpointParams } from '@apis/shoppingCart/shoppingCart.type';
import { DEFAULT_SIZE, INIT_PAGE } from '@hooks/product/useProducts/useProducts.constant';
import { generateQueryParams } from '@utils/queryString';

export const getCartItemsEndpoint = ({
  page = INIT_PAGE,
  size = DEFAULT_SIZE,
}: CartItemsEndpointParams): string => {
  const baseEndpoint = 'cart-items';

  const queryString = generateQueryParams({ page, size }).toString();

  console.log(`${baseEndpoint}?${queryString}`);
  return `${baseEndpoint}?${queryString}`;
};
