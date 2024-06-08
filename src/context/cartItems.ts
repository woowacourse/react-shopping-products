import { createContext } from 'react';

import { CartItemInfo } from '@/types/cartItem';
import { Product } from '@/types/product';

interface CartItemsContext {
  cartItems: CartItemInfo[];
  matchCartItem: (productId: number) => CartItemInfo | undefined;
  handleAddCartItem: (product: Product) => void;
  handleDeleteCartItem: (productId: number) => void;
}

export const CartItemsContext = createContext<CartItemsContext | null>(null);
