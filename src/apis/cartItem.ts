import { ENDPOINT } from "@/config/endPoint";
import { ERROR_MESSAGES } from "@/constants/messages";
import { basicToken } from "@/utils/auth";
import { CartItems } from "@/types/products";

export const getCartItems = async (): Promise<CartItems[]> => {
  const response = await fetch(ENDPOINT.cartItems);

  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.failPostCartItem);
  }

  const data = await response.json();
  return data;
};

export async function postCartItem({
  productId,
  quantity,
}: {
  productId: number;
  quantity: number;
}): Promise<Response> {
  const response = await fetch(`${ENDPOINT.cartItems}`, {
    method: "POST",
    headers: { Authorization: basicToken, "Content-Type": "application/json" },
    body: JSON.stringify({ productId, quantity }),
  });

  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.failPostCartItem);
  }

  return response;
}

export async function deleteCartItem({ productId }: { productId: number }): Promise<Response> {
  const response = await fetch(`${ENDPOINT.cartItems}`, {
    method: "DELETE",
    headers: { Authorization: basicToken, "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
  });

  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.deleteCartItem);
  }

  return response;
}
