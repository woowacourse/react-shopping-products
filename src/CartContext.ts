import { createContext } from 'react';
import useFetchCart from './hooks/useFetchCart';

export const CartContext = createContext<ReturnType<typeof useFetchCart>>({
  cartItems: [],
  isError: false,
  isPending: true,
  addProductToCart: async () => {},
  deleteToRemoveCart: async () => {},
  patchCartItemQuantity: async () => {},
});
