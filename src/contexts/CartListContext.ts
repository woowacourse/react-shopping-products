import { CartItem } from '@src/appTypes';
import { createContext } from 'react';

interface CartListContextType {
  cartListMap: Map<number, CartItem> | undefined;
  isSuccess: boolean;
}

const CartListContext = createContext<CartListContextType | null>(null);

export default CartListContext;
