import { baseAPI } from '@/api/baseAPI';
import { convertResponseToCart } from './responseMapper';
import { CartItemsResponse } from './type';
import { buildQueryString } from '@/api/buildQueryString';

export async function getShoppingCartList() {
  const initialPage = 0;
  const maxSize = 50;
  const queryString = buildQueryString([
    { name: 'page', value: initialPage },
    { name: 'size', value: maxSize },
  ]);

  const basePath = `/cart-items?${queryString}`;

  const data = await baseAPI<CartItemsResponse>({
    method: 'GET',
    path: basePath,
  });

  const results = data?.content.map((cart) => convertResponseToCart(cart));
  return results ?? [];
}
