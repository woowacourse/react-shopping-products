import { apiRequest } from './apiRequest';
import { CartItem } from '../types/common';
import { CartResponse } from '../types/response';

const defaultHeaders = {
  'Content-Type': 'application/json',
  Authorization: `Basic ${import.meta.env.VITE_API_KEY}`,
};

export const cartApi = {
  getCartItems: async () => {
    const response = await apiRequest<CartResponse>(
      '/cart-items?page=0&size=50',
      {
        headers: defaultHeaders,
      }
    );
    return response.content;
  },

  addToCart: async (productId: number) => {
    return apiRequest<CartItem>(`/cart-items`, {
      method: 'POST',
      body: {
        productId,
        quantity: 1,
      },
      headers: defaultHeaders,
    });
  },

  removeFromCart: async (cartItemId: number) => {
    return apiRequest(`/cart-items/${cartItemId}`, {
      method: 'DELETE',
      headers: defaultHeaders,
    });
  },

  patchCartItemQuantity: async (cartItemId: number, quantity: number) => {
    return apiRequest(`/cart-items/${cartItemId}`, {
      method: 'PATCH',
      body: {
        quantity,
      },
      headers: defaultHeaders,
    });
  },
};
