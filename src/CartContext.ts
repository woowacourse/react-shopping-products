import { createContext } from 'react';
import useFetchAddCart from './hooks/useFetchAddCart';

export const CartContext = createContext<ReturnType<typeof useFetchAddCart>>({
  cartIdSet: new Set(),
  setCartIdSet: () => {},
  addProductToCart: () => {},
  patchToRemoveCart: async () => {},
  fetchCart: async () => [],
});
