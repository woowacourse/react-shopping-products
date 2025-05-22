import { createContext, useContext } from 'react';
import useCartItems from '../../hooks/useCartItems';

export const CartItemsContext = createContext<ReturnType<
  typeof useCartItems
> | null>(null);

export const useCartItemsContext = () => {
  const context = useContext(CartItemsContext);
  console.log('context', context);
  if (!context) {
    throw new Error(
      'useCartItemsContext must be used within a CartItemsProvider'
    );
  }
  return context;
};
