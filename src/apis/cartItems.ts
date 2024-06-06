import { ENDPOINT } from "../constants/apis";
import { CartItem } from "../types/cartItem";
import { createFetchUrl, generateBasicToken } from "../utils";
import { fetchClient } from "./fetchClient";

export async function getCartItems(): Promise<CartItem[]> {
  const cartItemsCount = await getCartItemsCount();
  const params = { size: cartItemsCount?.toString() };

  const fetchUrl = createFetchUrl({ endpoint: ENDPOINT.CART_ITEMS, params });
  const response = await fetchClient({
    url: fetchUrl.href,
    method: "GET",
    token: generateBasicToken(),
  });

  return response.content;
}

async function getCartItemsCount(): Promise<number> {
  const fetchUrl = createFetchUrl({ endpoint: ENDPOINT.CART_ITEMS });
  const response = await fetchClient({
    url: fetchUrl.href,
    method: "GET",
    token: generateBasicToken(),
  });

  return response.totalElements;
}

export async function addCartItem(productId: number) {
  const body = { productId, quantity: 1 };

  await fetchClient({
    url: ENDPOINT.CART_ITEMS,
    method: "POST",
    body,
    token: generateBasicToken(),
  });
}

export async function removeCartItem(cartItemId: number) {
  await fetchClient({
    url: ENDPOINT.DELETE_CART_ITEM(cartItemId),
    method: "DELETE",
    token: generateBasicToken(),
  });
}
