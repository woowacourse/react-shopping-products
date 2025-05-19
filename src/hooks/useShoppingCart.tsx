import { useCallback, useEffect, useState } from "react";
import { CartItemTypes } from "../types/CartItemType";
import getShoppingCart from "../api/getShoppingCart";
import { findIsCartItem, isCartFull } from "../utils/cart";

type Status = "idle" | "loading" | "success" | "error";

export default function useShoppingCart() {
  const [cartItems, setCartItems] = useState<CartItemTypes[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string[]>([]);

  const updateErrorMessage = useCallback((errorMessage: string) => {
    setErrorMessage((prev) => [...prev, errorMessage]);
  }, []);

  useEffect(() => {
    async function fetchCartItems() {
      try {
        setStatus("loading");
        const cartItemsData = await getShoppingCart();
        setCartItems(cartItemsData.content);
        setStatus("success");
      } catch (e) {
        setStatus("error");
        updateErrorMessage(
          "장바구니 조회 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
        );
      }
    }
    fetchCartItems();
  }, [updateErrorMessage]);

  const updateCartItems = async () => {
    try {
      const cartItemsData = await getShoppingCart();
      setCartItems(cartItemsData.content);
    } catch (e) {
      //
    } finally {
      //
    }
  };

  const getMatchCartItem = useCallback(
    (productId: number) => findIsCartItem(cartItems, productId),
    [cartItems]
  );

  const checkMax = useCallback(() => isCartFull(cartItems), [cartItems]);

  return {
    cartItems,
    status,
    errorMessage,
    updateErrorMessage,
    updateCartItems,
    getMatchCartItem,
    checkMax,
  };
}
