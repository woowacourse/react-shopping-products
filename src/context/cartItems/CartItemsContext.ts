import { createContext } from 'react';
import { CartItem } from '../../types';

interface CartItemsContextValue {
  cartItems: CartItem[];
  refreshCartItems: () => void;
}

export const CartItemsContext = createContext<CartItemsContextValue | null>(
  null
);
