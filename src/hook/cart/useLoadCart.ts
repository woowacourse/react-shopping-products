import { useCallback } from 'react';
import { CartItem } from '../../types/common';
import { cartService } from '../../service/cart';

type loadCartProps = {
  onSuccess: (value: CartItem[]) => void;
};

export const useLoadCart = ({ onSuccess }: loadCartProps) => {
  return useCallback(async () => {
    try {
      const response = await cartService.getCartItems();
      onSuccess(response);
    } catch {
      onSuccess([]);
    }
  }, [onSuccess]);
};
