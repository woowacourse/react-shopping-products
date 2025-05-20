import { createContext, PropsWithChildren, useState, useEffect } from 'react';
import { CartItem, ErrorState } from '../types/product.type';
import { INITIAL_ERROR } from './context.constant';
import { useGetShoppingCart } from '../hooks/useGetShoppingCart';

interface ShoppingCartContextType {
  cartItems: CartItem[];
  shoppingCartError: ErrorState;
  updateCartItem: (newCartItems: CartItem[]) => void;
  updateShoppingCartError: (error: ErrorState) => void;
  updateIsShoppingLoading: (loading: boolean) => void;
  isShoppingCartLoading: boolean;
}

export const ShoppingCartContext =
  createContext<ShoppingCartContextType | null>(null);

const ShoppingCartProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { data, error, isLoading } = useGetShoppingCart();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [shoppingCartError, setShoppingCartError] =
    useState<ErrorState>(INITIAL_ERROR);
  const [isShoppingCartLoading, setIsShoppingCartLoading] =
    useState<boolean>(false);

  const updateCartItem = (newCartItems: CartItem[]) => {
    setCartItems(newCartItems);
  };

  const updateShoppingCartError = (error: ErrorState) => {
    setShoppingCartError(error);
    setTimeout(() => {
      setShoppingCartError(INITIAL_ERROR);
    }, 3000);
  };

  const updateIsShoppingLoading = (value: boolean) => {
    setIsShoppingCartLoading(value);
  };

  useEffect(() => {
    setCartItems(data);
    setShoppingCartError(error);
    setIsShoppingCartLoading(isLoading);
  }, [data, error, isLoading]);

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        shoppingCartError,
        updateCartItem,
        updateShoppingCartError,
        updateIsShoppingLoading,
        isShoppingCartLoading,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
