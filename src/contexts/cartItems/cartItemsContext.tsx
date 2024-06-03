import React, { createContext, useState, useEffect } from "react";
import { CartItem, getCartItems } from "@apis/cartItems";
import { useFetch } from "@hooks/useFetch";

interface CartItemsProviderProps {
  children: React.ReactNode;
}

export interface CartItemContextState {
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
    <CartItemsContext.Provider value={{ cartItems, isLoading, error, refreshCartItems }}>
      {children}
    </CartItemsContext.Provider>
  );
};
