import React, { createContext, useState, useEffect } from "react";
import { CartItem, getCartItems } from "../api/cartItems";

// Context 생성
export const CartItemsContext = createContext<{
  cartItems: CartItem[];
  refetch: () => Promise<void>;
  isLoading: boolean;
  error: Error | null;
}>({
  cartItems: [],
  refetch: async () => {},
  isLoading: false,
  error: null,
});

interface CartItemsProviderProps {
  children: React.ReactNode;
}

export const CartItemsProvider = ({ children }: CartItemsProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await getCartItems();
        setCartItems(res.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const refetch = async () => {
    const res = await getCartItems();
    setCartItems(res.data);
  };

  return (
    <CartItemsContext.Provider value={{ cartItems, refetch, isLoading, error }}>
      {children}
    </CartItemsContext.Provider>
  );
};

export default CartItemsContext;
