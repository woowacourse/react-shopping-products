import React from "react";
import { CartContext } from "./CartContext";
import useShoppingCart from "../hooks/useShoppingCart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const cart = useShoppingCart();

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}
