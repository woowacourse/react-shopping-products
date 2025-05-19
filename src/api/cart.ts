import { apiRequest } from '.';
import { CartItem } from '../types/common';
import { CartResponse } from '../types/response';

const BASE_URL = '/cart-items';
export const cartApi = {
  getCartItems: async (): Promise<CartItem[]> => {
    const response = await apiRequest<CartResponse>(
      `${BASE_URL}?page=0&size=50`
    );
    return response.content;
  },

  addToCart: async (productId: number): Promise<CartItem> => {
    return apiRequest<CartItem>(`${BASE_URL}`, {
      method: 'POST',
      body: {
        productId,
        quantity: 1,
      },
    });
  },

  removeFromCart: async (cartItemId: number): Promise<void> => {
    return apiRequest(`${BASE_URL}/${cartItemId}`, {
      method: 'DELETE',
    });
  },
};
