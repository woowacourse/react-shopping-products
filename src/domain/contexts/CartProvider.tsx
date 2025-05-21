import React from "react";
import { useCallback, useEffect, useState, useMemo } from "react";
import { CartItemTypes } from "../../types/CartItemType";
import getShoppingCart from "../../api/getShoppingCart";
import { findIsCartItem, isCartFull } from "../cart/cart";
import { CartContext } from "./useCartContext";

type Status = "idle" | "loading" | "success" | "error";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItemTypes[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string[]>([]);

  const updateErrorMessage = useCallback((errorMessage: string) => {
    setErrorMessage((prev) => [...prev, errorMessage]);
  }, []);

  const clearErrorMessage = useCallback(() => {
    setErrorMessage([]);
  }, []);

  useEffect(() => {
    async function fetchCartItems() {
      try {
        clearErrorMessage();
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
  }, [clearErrorMessage, updateErrorMessage]);

  const updateCartItems = useCallback(async () => {
    try {
      const cartItemsData = await getShoppingCart();
      setCartItems(cartItemsData.content);
    } catch (e) {
      console.error("장바구니 업데이트 중 오류가 발생했습니다:", e);
    }
  }, []);

  const getMatchCartItem = useCallback(
    (productId: number) => findIsCartItem(cartItems, productId),
    [cartItems]
  );

  const checkMax = useCallback(() => isCartFull(cartItems), [cartItems]);

  const contextValue = useMemo(
    () => ({
      cartItems,
      status,
      errorMessage,
      updateErrorMessage,
      clearErrorMessage,
      updateCartItems,
      getMatchCartItem,
      checkMax,
    }),
    [
      cartItems,
      status,
      errorMessage,
      updateErrorMessage,
      clearErrorMessage,
      updateCartItems,
      getMatchCartItem,
      checkMax,
    ]
  );
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
