import { createContext, useContext } from "react";
import type { CartItemTypes } from "../types/CartItemType";

export type Status = "idle" | "loading" | "success" | "error";

export interface CartContextValue {
  cartItems: CartItemTypes[];
  status: Status;
  errorMessage: string[];
  updateErrorMessage: (msg: string) => void;
  updateCartItems: () => Promise<void>;
  getMatchCartItem: (id: number) => CartItemTypes | undefined;
  checkMax: () => boolean;
}

export const CartContext = createContext<CartContextValue | null>(null);

export default function useCartContext(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("CartContext.Provider로 감싸주세요");
  return context;
}
