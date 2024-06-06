import { ERROR_MESSAGE } from "../constants/errorMessage/ko";
import { CART_ITEMS_ENDPOINT } from "./endPoint";
import { fetchWithToken } from "./fetchWithToken";

export async function getCartItems() {
  const fetchCartItems = async (size?: number) =>
    await fetchWithToken({
      url: `${CART_ITEMS_ENDPOINT}?size=${size}`,
      errorMessage: ERROR_MESSAGE.getCartItems,
    });

  const { totalElements } = await fetchCartItems();
  const data = await fetchCartItems(totalElements);

  return data.content;
}

export async function addCartItem(body: { productId: number; quantity: number }) {
  const data = await fetchWithToken({
    method: "POST",
    url: `${CART_ITEMS_ENDPOINT}`,
    headers: { "Content-type": "Application/json" },
    body: JSON.stringify(body),
    errorMessage: ERROR_MESSAGE.addCartItem,
  });

  return data;
}

export async function deleteCartItem(id: number) {
  const data = await fetchWithToken({
    method: "DELETE",
    url: `${CART_ITEMS_ENDPOINT}/${id}`,
    headers: { "Content-type": "Application/json" },
    errorMessage: ERROR_MESSAGE.deleteCartItem,
  });

  return data;
}

export async function modifyCartItem(id: number, quantity: number) {
  const data = await fetchWithToken({
    method: "PATCH",
    url: `${CART_ITEMS_ENDPOINT}/${id}`,
    body: JSON.stringify({ quantity }),
    headers: { "Content-type": "Application/json" },
    errorMessage: ERROR_MESSAGE.deleteCartItem,
  });

  return data;
}
