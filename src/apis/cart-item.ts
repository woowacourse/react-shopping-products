import { ENDPOINT } from "../constants/apis";
import { CartItem } from "../types/cartItem";
import createUrl from "../utils/createUrl";
import { generateBasicToken } from "../utils/generateBasicToken";
import { fetchClient } from "./fetchClient";

interface CartItemResponse {
  content: CartItem[];
  totalElements: number;
}

export async function getCartItems(totalItemCount?: number): Promise<CartItemResponse> {
  const token = generateBasicToken();
  const cartItemUrl = createUrl({ endpoint: ENDPOINT.CART_ITEMS, size: totalItemCount });

  const response = await fetchClient({
    url: cartItemUrl,
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
