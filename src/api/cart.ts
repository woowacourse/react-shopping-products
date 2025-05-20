import { apiRequest } from './apiRequest';
import { CartItem } from '../types/common';
import { CartResponse } from '../types/response';

export const cartApi = {
  getCartItems: async (): Promise<CartItem[]> => {
    const response = await apiRequest<CartResponse>(
      '/cart-items?page=0&size=50'
    );
    return response.content;
  },

  addToCart: async (productId: number): Promise<CartItem> => {
    return apiRequest<CartItem>(`/cart-items`, {
      method: 'POST',
      body: {
        productId,
        quantity: 1,
      },
    });
  },

  removeFromCart: async (cartItemId: number): Promise<void> => {
    return apiRequest(`/cart-items/${cartItemId}`, {
      method: 'DELETE',
    });
  },
};
