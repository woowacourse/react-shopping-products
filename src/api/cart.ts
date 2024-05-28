import apiClient from './apiClient';
import { CartItem } from '../types/CartItem.type';

export const fetchCartItems = async (): Promise<CartItem[]> => {
  return apiClient.get({ endpoint: '/cart-items' }).then((data) => data.content);
};

export const addCartItem = (productId: number): void => {
  apiClient.post({ endpoint: '/cart-items', body: { productId } });
};
