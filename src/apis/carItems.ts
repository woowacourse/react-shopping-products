import { END_POINTS } from './config';
import response from './response';

export async function fetchCartItemList() {
  const data = await response({
    url: `${END_POINTS.CART_ITMES}?size=2000`,
    method: 'GET',
  });
  return data;
}

export async function addCartItem(productId: number, quantity: number) {
  await response({
    url: `${END_POINTS.CART_ITMES}`,
    method: 'POST',
    body: JSON.stringify({ productId, quantity }),
  });
}

export async function deleteCartItem(cartItemId: number | undefined) {
  await response({
    url: `${END_POINTS.CART_ITMES}/${cartItemId}`,
    method: 'DELETE',
  });
}
