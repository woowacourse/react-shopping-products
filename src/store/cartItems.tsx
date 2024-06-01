import React, { createContext } from "react";
import useFetch from "../hooks/useFetch";
import { CartItem, getCartItems } from "../api/cartItems";

export const CartItemsContext = createContext<{
  cartItems: CartItem[];
  refetch: () => Promise<void>;
  isLoading: boolean;
  errorMessage: string;
}>({
  cartItems: [],
  refetch: async () => {},
  isLoading: false,
  errorMessage: "",
});

interface CartItemsProviderProps {
  children: React.ReactNode;
}

export const CartItemsProvider = ({ children }: CartItemsProviderProps) => {
  // NOTE: 래퍼 함수를 사용해 getCartItems의 결과에서 CartItem[]만 추출
  const fetchCartItems = async () => {
    const result = await getCartItems();
    return result.data;
  };

  const {
    data: cartItems,
    isLoading,
    errorMessage,
    refetch,
  } = useFetch<CartItem[]>(fetchCartItems);

  return (
    <CartItemsContext.Provider
      value={{ cartItems: cartItems ?? [], refetch, isLoading, errorMessage }}
    >
      {children}
    </CartItemsContext.Provider>
  );
};

export default CartItemsContext;
