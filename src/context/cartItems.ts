import { createContext } from 'react';

import { CartItemInfo } from '@/types/cartItem';

interface CartItemsContext {
  cartItems: CartItemInfo[];
  matchCartItem: (productId: number) => CartItemInfo | undefined;
  handleAddCartItem: (productId: number) => void;
  handleDeleteCartItem: (productId: number) => void;
}

export const CartItemsContext = createContext<CartItemsContext | null>(null);
