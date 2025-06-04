import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type PropsWithChildren,
} from "react";
import { CartContext } from "./CartContext";
import type { CartItemTypes } from "../types/CartItemType";
import getShoppingCart from "../api/shoppingCart/getShoppingCart";

export type CartStatus = "idle" | "loading" | "success" | "error";

export interface CartContextValue {
  cartItems: CartItemTypes[];
  status: CartStatus;
  errorMessage: string;
  refetchCart: () => Promise<void>;
  getMatchCartItem: (id: number) => CartItemTypes | undefined;
  checkMax: () => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export function useCartContext(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("CartProvider로 감싸주세요");
  return context;
}

export function CartProvider({ children }: PropsWithChildren) {
  const [cartItems, setCartItems] = useState<CartItemTypes[]>([]);
  const [status, setStatus] = useState<CartStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchCart = useCallback(async () => {
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await getShoppingCart();
      if (!res) {
        throw new Error("장바구니 데이터를 받아오지 못했습니다.");
      }
      setCartItems(res.content);
      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(
        err.message || "장바구니 호출 중 알 수 없는 오류가 발생했습니다."
      );
    }
  }, []);

  // 컴포넌트 마운트 시 한 번만 장바구니 데이터 가져오기
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // 장바구니를 다시 불러오는 함수 (리프레시 버튼 등에 사용)
  const refetchCart = useCallback(async () => {
    await fetchCart();
  }, [fetchCart]);

  // 이미 담긴 아이템을 찾는 함수
  const getMatchCartItem = useCallback(
    (id: number) => {
      return cartItems.find((item) => item.product.id === id);
    },
    [cartItems]
  );

  // 예시) 총 수량이 20개 미만일 때만 “추가 담기” 허용
  const checkMax = useCallback(() => {
    const totalQuantity = cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    return totalQuantity < 20;
  }, [cartItems]);

  const value: CartContextValue = {
    cartItems,
    status,
    errorMessage,
    refetchCart,
    getMatchCartItem,
    checkMax,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
