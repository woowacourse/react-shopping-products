import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type PropsWithChildren,
} from "react";
import getShoppingCart from "../../api/getShoppingCart";
import { findIsCartItem, isCartFull } from "../cart/cart";
import type { CartItemTypes } from "../../types/CartItemType";

type Status = "idle" | "loading" | "success" | "error";

interface CartContextType {
  cartItems: CartItemTypes[];
  status: Status;
  errorMessage: string[];
  updateErrorMessage: (msg: string) => void;
  updateCartItems: () => Promise<void>;
  getMatchCartItem: (productId: number) => CartItemTypes | undefined;
  checkMax: () => boolean;
  toggleCartItem: (productId: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: PropsWithChildren) {
  const [cartItems, setCartItems] = useState<CartItemTypes[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string[]>([]);

  const updateErrorMessage = useCallback((msg: string) => {
    setErrorMessage((prev) => [...prev, msg]);
  }, []);

  const clearErrorMessage = useCallback(() => {
    setErrorMessage([]);
  }, []);

  const fetchCartItems = useCallback(async () => {
    clearErrorMessage();
    setStatus("loading");
    try {
      const { content } = await getShoppingCart();
      setCartItems(content);
      setStatus("success");
    } catch {
      setStatus("error");
      updateErrorMessage(
        "장바구니 조회 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
      );
    }
  }, [clearErrorMessage, updateErrorMessage]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const updateCartItems = fetchCartItems;

  const getMatchCartItem = useCallback(
    (productId: number) => findIsCartItem(cartItems, productId),
    [cartItems]
  );

  const checkMax = useCallback(() => isCartFull(cartItems), [cartItems]);

  const toggleCartItem = useCallback(
    async (productId: number) => {
      const existing = findIsCartItem(cartItems, productId);
      if (existing) {
        await getShoppingCart().then(() => {});
      } else {
        // await addCartItem(productId);
      }
      await fetchCartItems();
    },
    [cartItems, fetchCartItems]
  );

  const value = useMemo(
    () => ({
      cartItems,
      status,
      errorMessage,
      updateErrorMessage,
      updateCartItems,
      getMatchCartItem,
      checkMax,
      toggleCartItem,
    }),
    [
      cartItems,
      status,
      errorMessage,
      updateErrorMessage,
      updateCartItems,
      getMatchCartItem,
      checkMax,
      toggleCartItem,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("CartProvider로 감싸주세요");
  return ctx;
}
