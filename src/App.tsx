import { createContext } from 'react';
import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';

import ShoppingProductsPage from './components/ShoppingProductsPage';
import useCartItems from './hooks/useCartItems';

import { CartItem } from './types/cart';

interface UseCartItemsContextProps {
  getCartItems: UseQueryResult<CartItem[], Error>;
  addCartItem: UseMutationResult<void, Error, number, unknown>;
  deleteCartItem: UseMutationResult<void, Error, number, unknown>;
}

export const UseCartItemsContext = createContext({} as UseCartItemsContextProps);

function App() {
  const { getCartItems, addCartItem, deleteCartItem } = useCartItems();

  return (
    <UseCartItemsContext.Provider
      value={{
        getCartItems,
        addCartItem,
        deleteCartItem,
      }}
    >
      <ShoppingProductsPage />
    </UseCartItemsContext.Provider>
  );
}

export default App;
