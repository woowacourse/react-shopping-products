import { useContext } from 'react';
import {
  CartItemListContext,
  CartItemListContextType,
} from '../store/CartItemListContext';

export const useCartItemListContext = (): CartItemListContextType => {
  const context = useContext(CartItemListContext);
  if (!context) {
    throw new Error(
      'useCartItemListContext는 CartItemListContext 내부에 있어야 합니다.',
    );
  }
  return context;
};
