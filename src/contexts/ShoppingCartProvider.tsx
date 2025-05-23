import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
} from 'react';
import { CartItem } from '../types/cart.type';
import { ErrorState } from '../types/error.type';
import { INITIAL_ERROR } from './context.constant';
import { useGetShoppingCart } from '../hooks/useGetShoppingCart';

interface ShoppingCartContextType {
  cartItems: CartItem[];
  error: ErrorState;
  updateItems: (newCartItems: CartItem[]) => void;
  updateError: (error: ErrorState) => void;
  updateLoading: (loading: boolean) => void;
  loading: boolean;
}

export const ShoppingCartContext =
  createContext<ShoppingCartContextType | null>(null);

const ShoppingCartProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { cartItems, error, loading, setCartItems, setError, setLoading } =
    useGetShoppingCart();

  const updateItems = useCallback(
    (newCartItems: CartItem[]) => {
      setCartItems(newCartItems);
    },
    [setCartItems]
  );

  const updateError = useCallback(
    (error: ErrorState) => {
      setError(error);
      setTimeout(() => {
        setError(INITIAL_ERROR);
      }, 3000);
    },
    [setError]
  );

  const updateLoading = useCallback(
    (value: boolean) => {
      setLoading(value);
    },
    [setLoading]
  );

  const value = useMemo(
    () => ({
      cartItems,
      error,
      updateItems,
      updateError,
      updateLoading,
      loading,
    }),
    [cartItems, error, updateItems, updateError, updateLoading, loading]
  );

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
