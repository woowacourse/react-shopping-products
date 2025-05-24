import { useData } from './useData';
import { CartItem } from '../types/cart.type';

export const useShoppingCart = () => {
  return useData<CartItem[]>({
    key: 'cart-items',
    endpoint: '/cart-items?page=0&size=50',
  });
};
