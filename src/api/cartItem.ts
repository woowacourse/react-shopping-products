import { CartItem } from '@/types/cartItem.type';
import { ENDPOINT } from './endpoints';
import { ERROR_MESSAGES } from '@/constants/error';
import { fetchWithAuth } from './utils/fetchClient';

/**
 * 사용자의 장바구니 목록 조회
 */
export const getCartList = async (): Promise<CartItem[]> => {
  const response = await fetchWithAuth(ENDPOINT.cartItem.getList, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.getCartList);
  }

  const data = await response.json();
  return data.content;
};

/**
 * 장바구니 목록 추가
 */
export const postCartItem = async (productId: number) => {
  const response = await fetchWithAuth(ENDPOINT.cartItem.postItem, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ productId, quantity: 1 }),
  });

  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.postCartItem);
  }
};

/**
 * 장바구니 아이템 삭제
 */
export const deleteCartItem = async (productId: number): Promise<void> => {
  const response = await fetchWithAuth(
    ENDPOINT.cartItem.deleteItem(productId),
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.deleteCartItem);
  }
};
