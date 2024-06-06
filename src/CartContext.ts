import { createContext } from 'react';
import useFetchAddCart from './hooks/useFetchAddCart';

export const CartContext = createContext<ReturnType<typeof useFetchAddCart>>({
  productIdSetInCart: new Set(),
  setProductIdSetInCart: () => {},
  addProductToCart: () => {},
  patchToRemoveCart: async () => {},
  fetchCart: async () => [],
});
