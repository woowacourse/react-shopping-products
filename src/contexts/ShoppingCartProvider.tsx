import { createContext, PropsWithChildren, useState, useEffect } from 'react';
import { CartItem, ErrorState } from '../types/product.type';
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
  const { data, shoppingCartError, isShoppingCartLoading } = useGetShoppingCart();
  const [items, setItems] = useState<CartItem[]>([]);
  const [error, setError] = useState<ErrorState>(INITIAL_ERROR);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateItems = (newCartItems: CartItem[]) => {
    setItems(newCartItems);
  };

  const updateError = (error: ErrorState) => {
    setError(error);
    setTimeout(() => {
      setError(INITIAL_ERROR);
    }, 3000);
  };

  const updateIsLoading = (value: boolean) => {
    setIsLoading(value);
  };

  useEffect(() => {
    setItems(data);
    setError(shoppingCartError);
    setIsLoading(isShoppingCartLoading);
  }, [data, shoppingCartError, isShoppingCartLoading]);

  return (
    <ShoppingCartContext.Provider
      value={{
        items,
        error,
        updateItems,
        updateError,
        updateIsLoading,
        isLoading,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
