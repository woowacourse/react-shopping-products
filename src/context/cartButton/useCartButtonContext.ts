import { useContext } from 'react';
import { CartButtonContext } from './CartButtonContext';

export function useCartButtonContext() {
  const context = useContext(CartButtonContext);
  if (!context) throw new Error('CartButtonContext is null');
  return context;
}
