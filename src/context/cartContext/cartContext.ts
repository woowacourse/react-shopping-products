import { createContext } from 'react';
import { CartItem } from '../../types/common';

interface CartContextType {
  cartData: CartItem[];
  addCart: (productId: number) => void;
  removeCart: (productId: number) => void;
}

const CartContext = createContext<CartContextType>({
  cartData: [],
  addCart: () => {},
  removeCart: () => {},
});

export default CartContext;
