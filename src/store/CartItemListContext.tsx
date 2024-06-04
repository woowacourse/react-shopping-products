import { createContext, Dispatch, SetStateAction } from 'react';
import { CartItem } from '../types/type';

interface CartItemListContextType {
  cartItemList: CartItem[];
  setCartItemList: Dispatch<SetStateAction<CartItem[]>>;
}
export const CartItemListContext =
  createContext<CartItemListContextType | null>(null);
