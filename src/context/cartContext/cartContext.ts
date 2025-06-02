import { createContext } from 'react';
import { CartItem } from '../../types/common';

interface CartContextType {
  cartData: CartItem[];
  addCart: (productId: number) => void;
  removeCart: (productId: number) => void;
  increaseCart: (
    cartItemId: number,
    quantity: number,
    productId: number
  ) => void;
  decreaseCart: (cartItemId: number, quantity: number) => void;
}

const CartContext = createContext<CartContextType>({
  cartData: [],
  addCart: () => {},
  removeCart: () => {},
  increaseCart: () => {},
  decreaseCart: () => {},
});

export default CartContext;
