import { baseAPI } from './baseAPI';
import { CartData } from './type';
import { convertResponseToCart } from '../components/features/product/responseMapper';

export async function getShoppingCartData() {
  const initialPage = 0;
  const maxSize = 50;
  const basePath = `/cart-items?page=${initialPage}&size=${maxSize}`;

  const data = await baseAPI<CartData>({
    method: 'GET',
    path: basePath,
  });

  const results = data?.content.map((cart) => convertResponseToCart(cart));
  console.log(results);
  return results ?? [];
}
