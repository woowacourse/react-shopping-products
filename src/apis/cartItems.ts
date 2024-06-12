import { ENDPOINT, ERROR_MESSAGE } from "../constants/apis";
import { CartItem, UpdateCartItemQuantityProps } from "../types/cartItem";
import { createFetchUrl, generateBasicToken } from "../utils";
import { fetchClient } from "./fetchClient";

export async function getCartItems(): Promise<CartItem[]> {
  try {
    const cartItemsCount = await getCartItemsCount();
    const params = { size: cartItemsCount?.toString() };

    const fetchUrl = createFetchUrl({ endpoint: ENDPOINT.CART_ITEMS, params });
    const response = await fetchClient({
      url: fetchUrl.href,
      method: "GET",
      token: generateBasicToken(),
    });

    return response.content;
  } catch {
    throw new Error(ERROR_MESSAGE.CART_ITEMS.FETCHING_FAILED);
  }
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

export async function addCartItem(productId: number): Promise<void> {
  try {
    const body = { productId, quantity: 1 };
    await fetchClient({
      url: ENDPOINT.CART_ITEMS,
      method: "POST",
      body,
      token: generateBasicToken(),
    });
  } catch {
    throw new Error(ERROR_MESSAGE.CART_ITEMS.ADD_TO_CART_FAILED);
  }
}

export async function removeCartItem(cartItemId: number): Promise<void> {
  try {
    await fetchClient({
      url: ENDPOINT.DELETE_CART_ITEM(cartItemId),
      method: "DELETE",
      token: generateBasicToken(),
    });
  } catch {
    throw new Error(ERROR_MESSAGE.CART_ITEMS.REMOVE_FROM_CART_FAILED);
  }
}

export async function updateCartItemQuantity({
  cartItemId,
  quantity,
}: UpdateCartItemQuantityProps): Promise<void> {
  try {
    await fetchClient({
      url: ENDPOINT.UPDATE_CART_ITEM(cartItemId),
      method: "PATCH",
      body: { quantity },
      token: generateBasicToken(),
    });
  } catch {
    throw new Error(ERROR_MESSAGE.CART_ITEMS.UPDATE_QUANTITY_FAILED);
  }
}
