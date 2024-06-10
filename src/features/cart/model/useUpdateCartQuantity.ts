import { useCallback } from 'react';

import { cartItemsAPI } from '@/shared/api/cart-items/cartItemsAPI';

export const useUpdateCartQuantity = (cartItemId: number, type: 'increase' | 'decrease') => {
  return useCallback(async () => {
    const quantityChange = type === 'increase' ? 1 : -1;
    await cartItemsAPI.post({ productId: cartItemId, quantity: quantityChange });
  }, [cartItemId, type]);
};
