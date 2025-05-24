import { PropsWithChildren, useState } from "react";
import { CartContext } from "../context/cartContext";
import { CartItem } from "../hooks/useFetchCartProducts/index.types";

export default function CartProvider({ children }: PropsWithChildren) {
  const [cartItems, setCartItems] = useState<CartItem[] | null>(null);
  const [cartItemIds, setCartItemIds] = useState<
    Record<"productId" | "cartId", number>[]
  >([]);

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, cartItemIds, setCartItemIds }}
    >
      {children}
    </CartContext.Provider>
  );
}
