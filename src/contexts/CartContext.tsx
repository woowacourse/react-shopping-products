import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { ProductDTOType } from '../types/product';
import getCarts from '../api/getCarts';

export type CartDataType = {
  id: number;
  quantity: number;
  product: ProductDTOType;
};

type CartContextType = {
  carts: CartDataType[] | null;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  cartItemCount: number;
  fetchCarts: (value?: boolean) => Promise<CartDataType[] | undefined>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [carts, setCarts] = useState<CartDataType[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchCarts = useCallback(async (isInitialFetch = false) => {
    try {
      if (isInitialFetch) {
        setIsLoading(true);
      } else {
        setIsFetching(true);
      }

      const data = await getCarts();
      setCarts(data);
      return data;
    } catch (e) {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchCarts(true);
  }, [fetchCarts]);

  const cartItemCount = carts ? new Set(carts.map((cart) => cart.product.id)).size : 0;

  return (
    <CartContext.Provider
      value={{ carts, isLoading, isFetching, isError, cartItemCount, fetchCarts }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};
