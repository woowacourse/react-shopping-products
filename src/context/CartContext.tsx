import React, { createContext } from "react";
import { ResponseCartItem } from "../api/types";

interface CartContextValue {
  cartItems: ResponseCartItem[];
  setCartItems: (items: ResponseCartItem[]) => void;
}

export const CartContext = createContext<CartContextValue | undefined>(
  undefined
);

interface CartProviderProps {
  children: React.ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = React.useState<ResponseCartItem[]>([]);

  const value: CartContextValue = {
    cartItems,
    setCartItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
