import { CartItemData } from '@/types';
import { createContext } from 'react';

interface CartItemContextType {
  isLoading: boolean;
  cartItemList: CartItemData[];
  toggleCartItem: (cartItemId: number) => void;
}

export const CartItemContext = createContext<CartItemContextType | undefined>(undefined);
