import { CartItem } from '@/types/index';
import { ENDPOINT } from './endpoints';
import { fetchWithAuth } from '@/api/utils/fetchClient';
import fetchWithErrorHandling from '@/api/utils/fetchWithErrorHandling';

export const getCartList = async (): Promise<CartItem[]> => {
  const data = await fetchWithErrorHandling<{ content: CartItem[] }>(
    () => fetchWithAuth(ENDPOINT.cartItem.getList, { method: 'GET' }),
    '장바구니에 담긴 상품들을 가져오는데 실패했습니다.',
  );
  return data.content;
};

export const getCartListQuantity = async (): Promise<number> => {
  const data = await fetchWithErrorHandling<{ quantity: number }>(
    () => fetchWithAuth(ENDPOINT.cartItem.getItemCount, { method: 'GET' }),
    '장바구니에 담긴 상품 수를 불러오는데 실패했습니다.',
  );

  return data.quantity;
};

export const addCartItem = async (productId: number) => {
  await fetchWithErrorHandling<void>(
    () =>
      fetchWithAuth(ENDPOINT.cartItem.postItem, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      }),
    '장바구니에 상품을 추가하는데 실패했습니다.',
  );
};

export const deleteCartItem = async (cartItemId: number): Promise<void> => {
  await fetchWithErrorHandling<void>(
    () =>
      fetchWithAuth(ENDPOINT.cartItem.deleteItem(cartItemId), {
        method: 'DELETE',
      }),
    '장바구니 아이템을 삭제하는데 실패했습니다.',
  );
};
