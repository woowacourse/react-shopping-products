import { useContext } from 'react';
import { CartContext } from './CartProvider';

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('CartProvider 안에서 사용해주세요.');
  }
  return context;
}
