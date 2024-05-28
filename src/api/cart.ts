import apiClient from './apiClient';
import { CartItem } from '../types/CartItem.type';

export const fetchCartItems = async (): Promise<CartItem[]> => {
  return apiClient.get({ endpoint: '/cart-items' }).then((data) => data.content);
};

export const addCartItem = async (productId: number): Promise<void> => {
  return apiClient.post({ endpoint: '/cart-items', body: { productId } });
};

export const deleteCartItem = async (cartItemId: number): Promise<void> => {
  return apiClient.delete({ endpoint: `/cart-items/${cartItemId}` });
};
