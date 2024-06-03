import fetchWithAuth from "./fetchWithAuth";
import { CART_ITEMS_ENDPOINT } from "./config";

export async function requestFetchCartItemList() {
  const response = await fetchWithAuth(
    `${CART_ITEMS_ENDPOINT}?size=2000`,
    "GET"
  );
  const data = await response.json();
  return data;
}

export async function requestAddCartItem(productId: number, quantity: number) {
  await fetchWithAuth(CART_ITEMS_ENDPOINT, "POST", { productId, quantity });
}

export async function requestDeleteCartItem(cartItemId: number | undefined) {
  await fetchWithAuth(`${CART_ITEMS_ENDPOINT}/${cartItemId}`, "DELETE");
}
