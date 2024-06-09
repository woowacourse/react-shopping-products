import { createContext } from 'react';
import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';

import ShoppingProductsPage from './components/ShoppingProductsPage';
import useCartItems from './hooks/useCartItems';

import { CartItem, FetchAdjustCartItemQuantityProps } from './types/cart';

interface UseCartItemsContextProps {
  getCartItems: UseQueryResult<CartItem[], Error>;
  addCartItem: UseMutationResult<void, Error, number, unknown>;
  deleteCartItem: UseMutationResult<void, Error, number, unknown>;
  adjustCartItemQuantity: UseMutationResult<void, Error, FetchAdjustCartItemQuantityProps, unknown>;
}

export const UseCartItemsContext = createContext({} as UseCartItemsContextProps);

function App() {
  const { getCartItems, addCartItem, deleteCartItem, adjustCartItemQuantity } = useCartItems();

  return (
    <UseCartItemsContext.Provider
      value={{
        getCartItems,
        addCartItem,
        deleteCartItem,
        adjustCartItemQuantity,
      }}
    >
      <ShoppingProductsPage />
    </UseCartItemsContext.Provider>
  );
}

export default App;
