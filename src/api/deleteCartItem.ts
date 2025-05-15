import { baseAPI } from './baseAPI';

export async function deleteCartItem(cartId: string) {
  await baseAPI({
    method: 'DELETE',
    path: `/cart-items/${cartId}`,
  });
}
