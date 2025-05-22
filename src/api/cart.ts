import { baseAPI } from './baseAPI';
import { APIResponse } from './type';
import { convertResponseToCart } from '../components/features/product/responseMapper';
import { ProductContent } from './products';

export type CartResponse = APIResponse<CartContent>;

export interface CartContent {
  id: number;
  quantity: number;
  product: ProductContent;
}

export async function getShoppingCartData() {
  const params = new URLSearchParams();
  params.set('page', '0');
  params.set('size', '50');
  const basePath = `/cart-items?${params.toString()}`;

  const data = await baseAPI<CartResponse>({
    method: 'GET',
    path: basePath,
  });

  const results = data?.content.map((cart) => convertResponseToCart(cart));
  return results ?? [];
}

export async function postCartItem(id: string) {
  return baseAPI({
    method: 'POST',
    path: `/cart-items`,
    body: {
      productId: id,
      quantity: 1,
    },
  });
}

export async function deleteCartItem(cartId: string) {
  await baseAPI({
    method: 'DELETE',
    path: `/cart-items/${cartId}`,
  });
}
