import { ERROR_TYPE } from "../../hooks/useError";
import request from "../../utils/request";

interface RemoveCartItemProps {
  cartId?: number;
  productId: number;
  setErrorTrue: (type: ERROR_TYPE) => void;
  setCartItemIds: React.Dispatch<
    React.SetStateAction<Record<"productId" | "cartId" | "quantity", number>[]>
  >;
}

export async function removeCartItem({
  cartId,
  setCartItemIds,
  setErrorTrue,
  productId,
}: RemoveCartItemProps) {
  try {
    await request({
      method: "DELETE",
      url: `/cart-items/${cartId}`,
    });
    setCartItemIds((prev) => prev.filter((ids) => ids.productId !== productId));
  } catch {
    setErrorTrue("MINUS");
  }
}
