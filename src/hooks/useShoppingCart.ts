import { useData } from './useData';
import { CartItem } from '../types/cart.type';
import {
  addShoppingCart,
  deleteShoppingCart,
  getShoppingCart,
  updateShoppingCart,
} from '../APIs/shoppingCartApi';
import { useCallback } from 'react';

const PARAMS = new URLSearchParams({ page: '0', size: '50' }).toString();

export const useShoppingCart = () => {
  const { data, loading, error, refetch } = useData<CartItem[]>({
    key: 'cart-items',
    endpoint: `/cart-items?${PARAMS}`,
    fetchFunction: getShoppingCart,
  });

  const add = useCallback(
    async (productId: number) => {
      await addShoppingCart({
        endpoint: '/cart-items',
        requestBody: { productId, quantity: 1 },
      });

      await refetch();
    },
    [refetch]
  );

  const remove = useCallback(
    async (cartItemId: number | null) => {
      if (!cartItemId) return;

      await deleteShoppingCart({
        endpoint: `/cart-items`,
        cartItemId,
      });

      await refetch();
    },
    [refetch]
  );

  const update = useCallback(
    async (cartItemId: number, quantity: number) => {
      await updateShoppingCart({
        endpoint: `/cart-items/${cartItemId}`,
        requestBody: { quantity },
      });

      await refetch();
    },
    [refetch]
  );

  return { data, loading, error, add, remove, update };
};
