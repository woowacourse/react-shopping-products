import { CartItem } from '@src/appTypes';
import { createContext } from 'react';

interface CarItemsContextType {
  handleCartAction: ({
    isInCart,
    productId,
    cartItem,
  }: {
    isInCart: boolean;
    productId: number;
    cartItem: CartItem | undefined;
  }) => Promise<void> | undefined;
}

const CartItemsContext = createContext<CarItemsContextType | null>(null);

export default CartItemsContext;
