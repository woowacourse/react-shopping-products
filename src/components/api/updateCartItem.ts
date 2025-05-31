import { ERROR_TYPE } from "../../hooks/useError";
import request from "../../utils/request";

interface PlusCartItemProps {
  cartId?: number;
  productQuantity: number;
  quantity?: number;
  setErrorTrue: (type: ERROR_TYPE) => void;

  syncCartWithServer: () => void;
}
interface MinusCartItemProps {
  cartId?: number;
  quantity?: number;
  syncCartWithServer: () => void;
}

export async function PlusCartItem({
  cartId,
  productQuantity,
  quantity,
  setErrorTrue,
  syncCartWithServer,
}: PlusCartItemProps) {
  if ((quantity ?? 0) >= productQuantity) {
    return setErrorTrue("CART_ADD");
  }
  try {
    await request({
      method: "PATCH",
      url: `/cart-items/${cartId}`,
      body: { quantity: (quantity ?? 0) + 1 },
    });
    syncCartWithServer();
  } catch {
    console.log("추가 실패");
  }
}
export async function MinusCartItem({
  cartId,
  quantity,
  syncCartWithServer,
}: MinusCartItemProps) {
  try {
    await request({
      method: "PATCH",
      url: `/cart-items/${cartId}`,
      body: { quantity: (quantity ?? 0) - 1 },
    });
    syncCartWithServer();
  } catch {
    console.log("빼기 실패");
  }
}
