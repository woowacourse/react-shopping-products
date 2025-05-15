import { baseAPI } from '../../api/baseAPI';
import { CartData } from '../../api/type';
import { convertResponseToCart } from '../../components/features/product/responseMapper';

export async function getShoppingCartData() {
  const initialPage = 0;
  const maxSize = 50;
  const basePath = `/cart-items?page=${initialPage}&size=${maxSize}`;

  const data = await baseAPI<CartData>({
    method: 'GET',
    path: basePath,
  });

  return data?.content.map((cart) => convertResponseToCart(cart));
}
