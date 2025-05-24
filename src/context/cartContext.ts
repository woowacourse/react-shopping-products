import { createContext } from "react";
import { CartItem } from "../hooks/useFetchCartProducts/index.types";

interface CartContextType {
  cartItemIds: Record<"productId" | "cartId", number>[];
  setCartItemIds: React.Dispatch<
    React.SetStateAction<Record<"productId" | "cartId", number>[]>
  >;
  cartItems: CartItem[] | null;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[] | null>>;
}

export const CartContext = createContext<CartContextType | null>({
  cartItemIds: [],
  setCartItemIds: () => {},
  cartItems: null,
  setCartItems: () => {},
});
