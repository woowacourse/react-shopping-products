import { useData } from './useData';
import { CartItem } from '../types/cart.type';
import { getShoppingCart } from '../APIs/shoppingCartApi';

const PARAMS = new URLSearchParams({ page: '0', size: '50' }).toString();

export const useShoppingCart = () => {
  return useData<CartItem[]>({
    key: 'cart-items',
    endpoint: `/cart-items?${PARAMS}`,
    fetchFunction: getShoppingCart,
  });
};
