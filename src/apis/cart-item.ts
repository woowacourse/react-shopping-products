import { fetchClient } from "./fetchClient";

import { generateBasicToken } from "../utils/generateBasicToken";

import { CartItems, CartItemsServerResponse } from "../types/cartItem";
import { ENDPOINT, PRODUCTS_ERROR_MESSAGES } from "../constants/apis";

async function getCartItems(totalItemCount?: number): Promise<CartItems | undefined> {
  const token = generateBasicToken();
  const cartItemUrl = createCartItemRequestUrl(totalItemCount);

  const response = await fetchClient<CartItemsServerResponse>({
    url: cartItemUrl,
    method: "GET",
    errorMessage: PRODUCTS_ERROR_MESSAGES.fetchingCartItems,
    token,
  });

  if (response) {
    return {
      cartItems: response.content,
      totalElements: response.totalElements,
    };
  }
}

export async function fetchCartItem() {
  const firstCartItems = await getCartItems();

  if (!firstCartItems) return;

  if (firstCartItems.totalElements <= 20) {
    return firstCartItems.cartItems;
  }

  const totalCartItems = await getCartItems(firstCartItems.totalElements);

  return totalCartItems?.cartItems;
}

export async function patchCartItemQuantity({
  cartItemId,
  quantity,
}: {
  cartItemId: number;
  quantity: number;
}) {
  const token = generateBasicToken();
  const body = { cartItemId, quantity };

  await fetchClient({
    url: `${ENDPOINT.CART_ITEMS}/${cartItemId}`,
    method: "PATCH",
    errorMessage: PRODUCTS_ERROR_MESSAGES.changeQuantity,
    body,
    token,
  });
}

export async function addCartItem(productId: number) {
  const token = generateBasicToken();
  const body = { productId, quantity: 1 };

  await fetchClient({
    url: ENDPOINT.CART_ITEMS,
    method: "POST",
    errorMessage: PRODUCTS_ERROR_MESSAGES.addingCartItem,
    body,
    token,
  });
}

export async function removeCartItem(cartItemId: number) {
  const token = generateBasicToken();
  const url = ENDPOINT.DELETE_CART_ITEM(cartItemId);

  return await fetchClient({
    url,
    method: "DELETE",
    errorMessage: PRODUCTS_ERROR_MESSAGES.removeCartItem,
    token,
  });
}

function createCartItemRequestUrl(totalElements?: number) {
  const params = new URLSearchParams();

  if (totalElements) params.append("size", String(totalElements));

  return `${ENDPOINT.CART_ITEMS}?${params.toString()}`;
}
