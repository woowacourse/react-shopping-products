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
  updateIsLoading: (loading: boolean) => void;
  isLoading: boolean;
}

export const ShoppingCartContext =
  createContext<ShoppingCartContextType | null>(null);

const ShoppingCartProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { data, shoppingCartError, isShoppingCartLoading } =
    useGetShoppingCart();
  const [items, setItems] = useState<CartItem[]>([]);
  const [error, setError] = useState<ErrorState>(INITIAL_ERROR);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateItems = useCallback((newCartItems: CartItem[]) => {
    setItems(newCartItems);
  }, []);

  const updateError = useCallback((error: ErrorState) => {
    setError(error);
    setTimeout(() => {
      setError(INITIAL_ERROR);
    }, 3000);
  }, []);

  const updateIsLoading = useCallback((value: boolean) => {
    setIsLoading(value);
  }, []);

  useEffect(() => {
    setItems(data);
    setError(shoppingCartError);
    setIsLoading(isShoppingCartLoading);
  }, [data, shoppingCartError, isShoppingCartLoading]);

  const value = useMemo(
    () => ({
      items,
      error,
      updateItems,
      updateError,
      updateIsLoading,
      isLoading,
    }),
    [items, error, updateItems, updateError, updateIsLoading, isLoading]
  );

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
