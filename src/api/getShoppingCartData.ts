import { baseAPI } from './baseAPI';
import { convertResponseToCart } from '../components/features/product/responseMapper';
import { CartItemsResponse } from './type';

export async function getShoppingCartData() {
  const initialPage = 0;
  const maxSize = 50;
  const basePath = `/cart-items?page=${initialPage}&size=${maxSize}`;

  const data = await baseAPI<CartItemsResponse>({
    method: 'GET',
    path: basePath,
  });

  const results = data?.content.map((cart) => convertResponseToCart(cart));
  return results ?? [];
}
