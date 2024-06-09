import { createContext } from 'react';
import useFetchAddCart from './hooks/useFetchAddCart';
import useFetchCart from './hooks/useFetchCart';
import { fetchCartItems } from './api/products';

export const CartContext = createContext<ReturnType<typeof useFetchCart>>({
  cartItems: [],
  isError: false,
  isPending: true,
  addProductToCart: async () => {},
  patchToRemoveCart: async () => {},
});
