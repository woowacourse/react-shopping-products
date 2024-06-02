import { CART_ITEMS_ENDPOINT } from './config';
import response from './response';

export async function requestFetchCartItemList() {
  const data = await response({
    url: `${CART_ITEMS_ENDPOINT}?size=2000`,
    method: 'GET',
    errorMessage: '장바구니 목록을 불러오는데 실패했어요..',
  });
  return data;
}

export async function requestAddCartItem(productId: number, quantity: number) {
  await response({
    url: `${CART_ITEMS_ENDPOINT}`,
    method: 'POST',
    errorMessage: '장바구니에 물건을 담는데 실패했어요.',
    body: JSON.stringify({ productId, quantity }),
  });
}

export async function requestDeleteCartItem(cartItemId: number | undefined) {
  await response({
    url: `${CART_ITEMS_ENDPOINT}/${cartItemId}`,
    method: 'DELETE',
    errorMessage: '장바구니에서 물건을 빼는데 실패했어요.',
  });
}
