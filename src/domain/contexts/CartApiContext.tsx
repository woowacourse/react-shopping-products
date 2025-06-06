import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import getShoppingCart from "../../api/shoppingCart/getShoppingCart";
import { CartItemTypes } from "../../types/CartItemType";

type Status = "idle" | "loading" | "success" | "error";

interface CartContextType {
  cartData: CartItemTypes[] | null;
  cartStatus: Status;
  cartError: string;
  refetchCart: () => Promise<void>;
}

const CartApiContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartApiProvider({ children }: CartProviderProps) {
  const [cartData, setCartData] = useState<CartItemTypes[] | null>(null);
  const [cartStatus, setCartStatus] = useState<Status>("idle");
  const [cartError, setCartError] = useState<string>("");

  const fetchCart = useCallback(async () => {
    setCartError("");
    setCartStatus("loading");

    try {
      const res = await getShoppingCart();
      if (!res) {
        throw new Error("장바구니 데이터를 가져오지 못했습니다.");
      }
      setCartData(res.content);
      setCartStatus("success");
    } catch (err: unknown) {
      setCartStatus("error");
      setCartError(
        err instanceof Error
          ? err.message
          : "장바구니를 불러오는 중 알 수 없는 오류가 발생했습니다."
      );
    }
  }, []);

  useEffect(() => {
    if (cartData === null) {
      fetchCart();
    }
  }, [cartData, fetchCart]);

  const value: CartContextType = {
    cartData,
    cartStatus,
    cartError,
    refetchCart: fetchCart,
  };

  return (
    <CartApiContext.Provider value={value}>{children}</CartApiContext.Provider>
  );
}

export function useCartApi() {
  const context = useContext(CartApiContext);
  if (!context) {
    throw new Error(
      "useCartApi는 CartApiProvider 내부에서만 호출할 수 있습니다."
    );
  }
  return context;
}
