import apiClient from './apiClient';
import { CartItem } from '../types/CartItem.type';
import { SIZE } from '../constants/api';

interface CartApi {
  data: CartItem[];
  totalElements: number;
}

export const fetchCartItems = async (size: number = SIZE.ADDITIONAL): Promise<CartApi> => {
  const data = await apiClient.get({
    endpoint: `/cart-items?size=${size}`,
    errorMessage: '장바구니 요소를 불러오는 중 에러가 발생했습니다.',
  });

  return { data: data.content, totalElements: data.totalElements };
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
