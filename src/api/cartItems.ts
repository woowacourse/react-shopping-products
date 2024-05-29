import { CART_ITEMS_ENDPOINT } from "./endPoint";
import { fetchWithToken } from "./fetchWithToken";

export async function getCartItems() {
  const data = await fetchWithToken({
    url: `${CART_ITEMS_ENDPOINT}`,
    errorMessage: "Failed to fetch cart items",
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
    errorMessage: "Failed to fetch cart items",
  });

  return data;
}

export async function deleteCartItems(id: number) {
  const data = await fetchWithToken({
    method: "DELETE",
    url: `${CART_ITEMS_ENDPOINT}/${id}`,
    errorMessage: "Failed to fetch cart items",
  });

  return data;
}
