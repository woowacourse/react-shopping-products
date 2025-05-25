import { ERROR_TYPE } from "../../hooks/useError";
import request from "../../utils/request";

interface PlusItemProps {
  cartId: number | undefined;
  quantity: number | undefined;
  syncCartWithServer: () => void;
}
interface AddItemToCartProps {
  productId: number;
  cartAmount: number;
  setErrorTrue: (type: ERROR_TYPE) => void;
  syncCartWithServer: () => void;
}

interface RemoveItemToCartProps {
  cartId?: number;
  productId: number;
  setErrorTrue: (type: ERROR_TYPE) => void;
  setCartItemIds: React.Dispatch<
    React.SetStateAction<Record<"productId" | "cartId", number>[]>
  >;
}

export async function PlusItem({
  cartId,
  quantity,
  syncCartWithServer,
}: PlusItemProps) {
  try {
    await request({
      headers: {
        Authorization: import.meta.env.VITE_TOKEN,
        "Content-Type": "application/json",
      },
      method: "PATCH",
      url: `/cart-items/${cartId}`,
      body: { quantity: (quantity ?? 0) + 1 },
    });
    syncCartWithServer();
  } catch {
    console.log("굿");
  }
}

export async function addItemToCart({
  cartAmount,
  setErrorTrue,
  productId,
  syncCartWithServer,
}: AddItemToCartProps) {
  try {
    if (cartAmount >= 50) {
      setErrorTrue("CART_MAX");
      return;
    }
    await request({
      headers: {
        Authorization: import.meta.env.VITE_TOKEN,
        "Content-Type": "application/json",
      },
      method: "POST",
      url: "/cart-items",
      body: { productId, quantity: 1 },
    });
    syncCartWithServer();
  } catch {
    setErrorTrue("ADD");
  }
}

export async function removeItemToCart({
  cartId,
  setCartItemIds,
  setErrorTrue,
  productId,
}: RemoveItemToCartProps) {
  try {
    await request({
      headers: {
        Authorization: import.meta.env.VITE_TOKEN,
        "Content-Type": "application/json",
      },
      method: "DELETE",
      url: `/cart-items/${cartId}`,
    });
    setCartItemIds((prev) => prev.filter((ids) => ids.productId !== productId));
  } catch {
    setErrorTrue("MINUS");
  }
}
