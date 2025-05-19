import React, { createContext, useContext } from "react";
import type { CartItemTypes } from "../types/CartItemType";

interface CartContextValue {
  getMatchCartItem: (id: number) => CartItemTypes | undefined;
  checkMax: () => boolean;
  updateCartItems: () => Promise<void>;
}

export const CartContext = createContext<CartContextValue | null>(null);

export function useCartContext(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("CartContext.Provider로 감싸주세요");
  return ctx;
}
