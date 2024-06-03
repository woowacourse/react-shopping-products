import { useContext } from 'react';
import { CartItemsContext } from './CartItemsContext';

export function useCartItemsContext() {
  const context = useContext(CartItemsContext);
  if (!context) {
    throw new Error('CartItemsContext is null');
  }
  return context;
}
