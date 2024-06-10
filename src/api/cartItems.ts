import { CART_ITEMS_ENDPOINT } from "./endPoint";
import { ERROR_MESSAGE } from "../constants/message";
import { fetchWithToken } from "./fetchWithToken";

export async function getCartItems(size: number = 20) {
  const data = await fetchWithToken({
    url: `${CART_ITEMS_ENDPOINT}?size=${size}`,
    errorMessage: ERROR_MESSAGE.getCartItems,
  });

  return data;
}

export async function postCartItems(body: {
  productId: number;
  quantity: number;
}) {
  const data = await fetchWithToken({
    method: "POST",
    url: `${CART_ITEMS_ENDPOINT}`,
    headers: { "Content-type": "Application/json" },
    body: JSON.stringify(body),
    errorMessage: ERROR_MESSAGE.postCartItems,
  });

  return data;
}

export async function deleteCartItems(id: number) {
  const data = await fetchWithToken({
    method: "DELETE",
    url: `${CART_ITEMS_ENDPOINT}/${id}`,
    errorMessage: ERROR_MESSAGE.deleteCartItems,
  });

  return data;
}

export async function patchCartItem(
  id: number,
  quantity: number
): Promise<void> {
  await fetchWithToken({
    method: "PATCH",
    url: `${CART_ITEMS_ENDPOINT}/${id}`,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
    errorMessage: ERROR_MESSAGE.patchCartItem,
  });
}
