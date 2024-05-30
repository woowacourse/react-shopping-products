import apiClient from './apiClient';
import { CartItem } from '../types/CartItem.type';
import { SIZE } from '../constants/api';
import { ERROR_MESSAGES } from '../constants/message';

interface CartApi {
  data: CartItem[];
  totalElements: number;
}

export const fetchCartItems = async (size: number = SIZE.DEFAULT): Promise<CartApi> => {
  const data = await apiClient.get({
    endpoint: `/cart-items?size=${size}`,
    errorMessage: ERROR_MESSAGES.FETCH_CART_ITEMS,
  });

  return { data: data.content, totalElements: data.totalElements };
};

export const addCartItem = async (productId: number): Promise<void> => {
  return apiClient.post({
    endpoint: '/cart-items',
    body: { productId },
    errorMessage: ERROR_MESSAGES.ADD_CART_ITEMS,
  });
};

export const deleteCartItem = async (cartItemId: number): Promise<void> => {
  return apiClient.delete({
    endpoint: `/cart-items/${cartItemId}`,
    errorMessage: ERROR_MESSAGES.DELETE_CART_ITEMS,
  });
};
