import React, { createContext, useState, useEffect } from "react";
import { CartItem, getCartItems } from "../api/cartItems";

interface CartItemContextState {
  cartItems: CartItem[];
  refetch: () => Promise<void>;
  loading: boolean;
  error: Error | null;
}

export const CartItemsContext = createContext<CartItemContextState>({
  cartItems: [],
  refetch: async () => {},
  loading: false,
  error: null,
});

interface CartItemsProviderProps {
  children: React.ReactNode;
}

export const CartItemsProvider = ({ children }: CartItemsProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getCartItems();
        setCartItems(res.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const refetch = async () => {
    const res = await getCartItems();
    setCartItems(res.data);
  };

  return (
    <CartItemsContext.Provider value={{ cartItems, refetch, loading, error }}>
      {children}
    </CartItemsContext.Provider>
  );
};
