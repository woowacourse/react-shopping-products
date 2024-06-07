import apiClient from './apiClient';
import { Cart } from '../types/Cart.type';
import { SIZE } from '../constants/api';
import { ERROR_MESSAGES } from '../constants/message';

interface UpdateCartQuantityRequest {
  cartItemId: number;
  quantity: number;
}

interface CartApiResponse {
  data: Cart[];
  totalElements: number;
}

export const fetchCartItems = async (size: number = SIZE.DEFAULT): Promise<CartApiResponse> => {
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
    errorMessage: ERROR_MESSAGES.ADD_CART_ITEM,
  });
};

export const deleteCartItem = async (cartItemId: number): Promise<void> => {
  return apiClient.delete({
    endpoint: `/cart-items/${cartItemId}`,
    errorMessage: ERROR_MESSAGES.DELETE_CART_ITEM,
  });
};

export const updateCartItemQuantity = async ({ cartItemId, quantity }: UpdateCartQuantityRequest): Promise<void> => {
  return apiClient.patch({
    endpoint: `/cart-items/${cartItemId}`,
    body: { quantity },
    errorMessage: ERROR_MESSAGES.UPDATE_CART_ITEM_QUANTITY,
  });
};
