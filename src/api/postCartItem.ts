import { baseAPI } from './baseAPI';

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
