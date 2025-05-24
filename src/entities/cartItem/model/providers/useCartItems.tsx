import { useContext } from "react";
import { CartItemContext, CartItemContextType } from "./CartItemContext";

export const useCartItems = (): CartItemContextType => {
  const context = useContext(CartItemContext);

  if (!context) {
    throw new Error("useCartItems must be used within a CartItemProvider");
  }

  return context;
};
