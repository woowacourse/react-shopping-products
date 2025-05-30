import { ERROR_TYPE } from "../../hooks/useError";
import request from "../../utils/request";

interface AddCartItemProps {
  productId: number;
  cartAmount: number;
  setErrorTrue: (type: ERROR_TYPE) => void;
  syncCartWithServer: () => void;
}

export async function addCartItem({
  cartAmount,
  setErrorTrue,
  productId,
  syncCartWithServer,
}: AddCartItemProps) {
  try {
    if (cartAmount >= 50) {
      return setErrorTrue("CART_MAX");
    }

    await request({
      method: "POST",
      url: "/cart-items",
      body: { productId, quantity: 1 },
    });
    syncCartWithServer();
  } catch {
    setErrorTrue("ADD");
  }
}
