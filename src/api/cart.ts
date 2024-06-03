import { AUTH_HEADER } from './auth';
import { END_POINT } from './endpoints';
import fetcher from './fetcher';

import { CartItemInfo } from '@/types/cartItem';

interface AddCartItemProp {
  productId: number;
  quantity?: number;
}

type MutationResponse = Record<'status', number>;

export const fetchCartItems = async (): Promise<CartItemInfo[]> => {
  const response = await fetcher.get({
    url: `${END_POINT.cartItems}`,
    headers: AUTH_HEADER,
    errorMessage: '장바구니 조회에 실패했습니다',
  });

  const data = await response.json();

  return data.content;
};

export const addCartItem = async ({
  productId,
  quantity = 1,
}: AddCartItemProp): Promise<MutationResponse> => {
  const response = await fetcher.post({
    url: END_POINT.cartItems,
    headers: AUTH_HEADER,
    body: {
      productId,
      quantity,
    },
    errorMessage: '장바구니 추가에 실패했습니다',
  });

  return { status: response.status };
};

export const deleteCartItem = async (cartId: number): Promise<MutationResponse> => {
  const response = await fetcher.delete({
    url: `${END_POINT.cartItems}/${cartId}`,
    headers: AUTH_HEADER,
    errorMessage: '장바구니 삭제에 실패했습니다',
  });

  return { status: response.status };
};
