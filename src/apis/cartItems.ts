import { ENDPOINT } from "../constants/apis";
import { CartItem } from "../types/cartItem";
import { createFetchUrl, generateBasicToken } from "../utils";
import { fetchClient } from "./fetchClient";

interface CartItemResponse {
  content: CartItem[];
  totalElements: number;
}

export async function getCartItems(totalItemCount?: number): Promise<CartItemResponse> {
  const token = generateBasicToken();
  const params = { size: totalItemCount?.toString() };
  const fetchUrl = createFetchUrl({ endpoint: ENDPOINT.CART_ITEMS, params });

  const response = await fetchClient({
    url: fetchUrl.href,
    method: "GET",
    token,
  });

  return {
    content: response.content,
    totalElements: response.totalElements,
  };
}

export async function addCartItem(productId: number) {
  const token = generateBasicToken();
  const body = { productId, quantity: 1 };

  await fetchClient({
    url: ENDPOINT.CART_ITEMS,
    method: "POST",
    body,
    token,
  });
}

export async function removeCartItem(cartItemId: number) {
  const token = generateBasicToken();

  await fetchClient({
    url: ENDPOINT.DELETE_CART_ITEM(cartItemId),
    method: "DELETE",
    token,
  });
}
