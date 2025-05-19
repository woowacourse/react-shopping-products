import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ERROR_TYPE } from "./useError";
import request from "../utils/request";
import { CartItem } from "../types/response.types";

interface CartContextType {
  cartItemIds: Record<"productId" | "cartId", number>[];
  setCartItemIds: React.Dispatch<
    React.SetStateAction<Record<"productId" | "cartId", number>[]>
  >;
  fetchCartProducts: () => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("CartProvider로 감싸야 합니다.");
  return context;
}

export function CartProvider({
  children,
  setErrorTrue,
}: {
  children: React.ReactNode;
  setErrorTrue: (type: ERROR_TYPE) => void;
}) {
  const [cartItemIds, setCartItemIds] = useState<
    Record<"productId" | "cartId", number>[]
  >([]);

  const fetchCartProducts = useCallback(async () => {
    try {
      const data = await request({
        method: "GET",
        url: "/cart-items",
        headers: {
          Authorization: import.meta.env.VITE_TOKEN,
          "Content-Type": "application/json",
        },
      });

      setCartItemIds(
        data.content.map((item: CartItem) => ({
          productId: item.product.id,
          cartId: item.id,
        }))
      );
    } catch {
      setErrorTrue("CART");
    }
  }, [setErrorTrue]);

  useEffect(() => {
    fetchCartProducts();
  }, [fetchCartProducts]);

  return (
    <CartContext.Provider
      value={{
        cartItemIds,
        setCartItemIds,
        fetchCartProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
