import { CartItem } from '@/types/cartItem.type';
import { ENDPOINT } from './endpoints';
import { fetchWithAuth } from './utils/fetchClient';

/**
 * 사용자의 장바구니 목록 조회
 */
export const getCartList = async (): Promise<CartItem[]> => {
  const response = await fetchWithAuth(ENDPOINT.cartItem.getList, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(
      '장바구니 정보 불러오기를 실패했습니다. 다시 시도해 주세요.'
    );
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
    throw new Error(
      '해당 아이템을 장바구니에 담기 실패 했습니다. 다시 시도해 주세요.'
    );
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
    throw new Error(
      '해당 아이템을 장바구니에서 삭제 실패 했습니다. 다시 시도해 주세요. '
    );
  }
};
