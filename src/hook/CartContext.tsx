import React, { createContext, useContext, useEffect, useReducer } from "react";
import { CartItemType } from "../types/cartItem";
import { getCartItems } from "../api/cartItem";

const CartContext = createContext<
  (CartState & { dispatch: React.Dispatch<CartAction> }) | null
>(null);

type CartAction =
  | { type: "update" }
  | { type: "set"; payload: CartItemType[] }
  | { type: "error"; payload: string };

interface CartState {
  cartItemList: CartItemType[];
  loading: boolean;
  error: string | null;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItemState, dispatch] = useReducer(cartItemReducer, {
    cartItemList: [],
    loading: false,
    error: null,
  });

  function cartItemReducer(cartItemState: CartState, action: CartAction) {
    switch (action.type) {
      case "update":
        return { ...cartItemState, loading: true, error: null };
      case "set":
        return { cartItemList: action.payload, loading: false, error: null };
      case "error":
        return { ...cartItemState, loading: false, error: action.payload };
      default:
        return cartItemState;
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await getCartItems({ sortBy: "asc" });
        dispatch({ type: "set", payload: res.content });
      } catch (err) {
        dispatch({ type: "error", payload: "장바구니 불러오기 실패" });
      }
    })();
  }, [cartItemState.loading]);

  return (
    <CartContext.Provider value={{ ...cartItemState, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
