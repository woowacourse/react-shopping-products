import { createContext, useContext, ReactNode, useMemo } from "react";
import useFetch from "../hooks/useFetch";
import { CartItemResponse } from "../types/response";

import { URLS } from "../constants/url";
import { CartItem } from "../types/cartContents";

interface CartContextType {
  cartData: CartItem[] | undefined;
  cartFetchLoading: boolean;
  cartFetchError: Error | null;
  fetchCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const fetchOptions = useMemo(
    () => ({
      headers: {
        Authorization: `Basic ${btoa(
          `${import.meta.env.VITE_USER_ID}:${import.meta.env.VITE_PASSWORD}`
        )}`,
        "Content-Type": "application/json",
      },
    }),
    []
  );

  const {
    data: cartItems,
    fetcher: fetchCart,
    error: cartFetchError,
    isLoading: cartFetchLoading,
  } = useFetch<CartItemResponse>(URLS.CART_ITEMS, fetchOptions, false);

  return (
    <CartContext.Provider
      value={{
        cartData: cartItems?.content,
        cartFetchLoading,
        cartFetchError,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const cartContext = useContext(CartContext);
  if (cartContext === undefined) {
    throw new Error("useCartContext는 프로바이더 안쪽에 위치를 해야 합니다.");
  }
  return cartContext;
};
