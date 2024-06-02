import { useContext } from "react";
import { CartItemContextState, CartItemsContext } from "@contexts/cartItems/cartItemsContext";

export const useCartItems = (): CartItemContextState => {
  const context = useContext(CartItemsContext);

  if (context === undefined) {
    throw new Error("useCartItemsContext는 CartItemsProvider 내부에서 사용되어야 합니다.");
  }

  return context;
};
