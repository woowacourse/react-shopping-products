import { createContext } from 'react';

import ShoppingProductsPage from './components/ShoppingProductsPage';
import useCartItems from './hooks/useCartItems';

import { CartItem } from './types/cart';

interface UseCartItemsContextProps {
  cartItems: CartItem[];
  getCartItems: () => Promise<void>;
  addCartItem: (productId: number) => Promise<void>;
  deleteCartItem: (cartId: number) => Promise<void>;
  cartItemsLoading: boolean;
  cartItemsError: unknown;
}

const UseCartItemsInitialState: UseCartItemsContextProps = {
  cartItems: [],
  getCartItems: async () => {},
  addCartItem: async () => {},
  deleteCartItem: async () => {},
  cartItemsLoading: false,
  cartItemsError: null,
};

export const UseCartItemsContext = createContext(UseCartItemsInitialState);

function App() {
  const { cartItems, getCartItems, addCartItem, deleteCartItem, cartItemsLoading, cartItemsError } =
    useCartItems();

  return (
    <UseCartItemsContext.Provider
      value={{
        cartItems,
        getCartItems,
        addCartItem,
        deleteCartItem,
        cartItemsLoading,
        cartItemsError,
      }}
    >
      <ShoppingProductsPage />
    </UseCartItemsContext.Provider>
  );
}

export default App;
