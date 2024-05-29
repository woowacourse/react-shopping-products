import apiClient from './apiClient';
import { CartItem } from '../types/CartItem.type';

export const fetchCartItems = async (): Promise<CartItem[]> => {
  return apiClient
    .get({ endpoint: '/cart-items', errorMessage: '장바구니 요소를 불러오는 중 에러가 발생했습니다.' })
    .then((data) => data.content);
};

export const addCartItem = async (productId: number): Promise<void> => {
  return apiClient.post({
    endpoint: '/cart-items',
    body: { productId },
    errorMessage: '장바구니에 상품을 추가하는 과정에서 에러가 발생했습니다.',
  });
};

export const deleteCartItem = async (cartItemId: number): Promise<void> => {
  return apiClient.delete({
    endpoint: `/cart-items/${cartItemId}`,
    errorMessage: '장바구니에 상품을 제거하는 과정에서 에러가 발생했습니다.',
  });
};
