import React, { createContext, useState, useEffect } from "react";
import { CartItem, getCartItems } from "../api/cartItems";
import { useFetch } from "../hooks/useFetch";

interface CartItemContextState {
  cartItems: CartItem[];
  isLoading: boolean;
  error: Error | null;
  refreshCartItems: () => Promise<void>;
}

export const CartItemsContext = createContext<CartItemContextState>({
  cartItems: [],
  isLoading: false,
  error: null,
  refreshCartItems: async () => {},
});

interface CartItemsProviderProps {
  children: React.ReactNode;
}

export const CartItemsProvider = ({ children }: CartItemsProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { fetchData: fetchCartItems, isLoading, error } = useFetch(getCartItems);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchCartItems();
      if (data) {
        setCartItems(data);
      }
    };

    loadData();
  }, []);

  const refreshCartItems = async () => {
    const data = await getCartItems();
    setCartItems(data);
  };

  return (
    <CartItemsContext.Provider value={{ cartItems, refreshCartItems, isLoading, error }}>
      {children}
    </CartItemsContext.Provider>
  );
};
