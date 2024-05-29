import { CartItem, ServerResponse } from '@appTypes/index';
import { fetchWithToken } from '@utils/index';

import { END_POINTS } from './endPoints';

export async function fetchPostCartItems({ productId }: { productId: number }) {
  await fetchWithToken({
    url: `${END_POINTS.cartItems}`,
    method: 'POST',
    body: JSON.stringify({
      productId: productId,
      quantity: 1,
    }),
  });
}

export async function fetchGetCartItemsTotalNumbers(): Promise<{ totalNumbers: number }> {
  const data = await fetchWithToken({
    url: END_POINTS.cartItems,
    method: 'GET',
  });

  const result = (await data.json()) as ServerResponse<CartItem[]>;

  return { totalNumbers: result.totalElements };
}

