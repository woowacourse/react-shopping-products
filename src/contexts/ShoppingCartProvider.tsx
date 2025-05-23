import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { CartItem } from '../types/cart.type';
import { ErrorState } from '../types/error.type';
import { INITIAL_ERROR } from './context.constant';
import { useGetShoppingCart } from '../hooks/useGetShoppingCart';

interface ShoppingCartContextType {
  items: CartItem[];
  error: ErrorState;
  updateItems: (newCartItems: CartItem[]) => void;
  updateError: (error: ErrorState) => void;
  updateLoading: (loading: boolean) => void;
  loading: boolean;
}

export const ShoppingCartContext =
  createContext<ShoppingCartContextType | null>(null);

const ShoppingCartProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const shoppingCart = useGetShoppingCart();
  const [items, setItems] = useState<CartItem[]>([]);
  const [error, setError] = useState<ErrorState>(INITIAL_ERROR);
  const [loading, setLoading] = useState<boolean>(false);

  const updateItems = useCallback((newCartItems: CartItem[]) => {
    setItems(newCartItems);
  }, []);

  const updateError = useCallback((error: ErrorState) => {
    setError(error);
    setTimeout(() => {
      setError(INITIAL_ERROR);
    }, 3000);
  }, []);

  const updateLoading = useCallback((value: boolean) => {
    setLoading(value);
  }, []);

  useEffect(() => {
    setItems(shoppingCart.data);
    setError(shoppingCart.error);
    setLoading(shoppingCart.loading);
  }, [shoppingCart.data, shoppingCart.error, shoppingCart.loading]);

  const value = useMemo(
    () => ({
      items,
      error,
      updateItems,
      updateError,
      updateLoading,
      loading,
    }),
    [items, error, updateItems, updateError, updateLoading, loading]
  );

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
