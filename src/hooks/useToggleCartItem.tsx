import { useCallback } from "react";
import postShoppingCart from "../api/postShoppingCart";
import deleteShoppingCart from "../api/deleteShoppingCart";
import type { CartItemTypes } from "../types/CartItemType";

export function useToggleCartItem(
  productId: number,
  getMatchCartItem: (id: number) => CartItemTypes | undefined,
  checkMax: () => boolean,
  updateCartItems: () => Promise<void>
) {
  return useCallback(async () => {
    if (checkMax()) {
      throw new Error("50개 초과");
    }
    const existing = getMatchCartItem(productId);
    if (existing) {
      await deleteShoppingCart(existing.id);
    } else {
      await postShoppingCart(productId, 1);
    }
    await updateCartItems();
  }, [productId, getMatchCartItem, checkMax, updateCartItems]);
}
