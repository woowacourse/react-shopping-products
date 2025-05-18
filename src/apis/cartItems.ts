import { CartItems } from "../types/cartItems";
import { createApiUrl, fetchWithErrorHandling, SHOP_API } from "./configs";

const CART_ITEMS_BASE_URL = createApiUrl(SHOP_API.endpoint.cartItems);

export const CartItemsAPI = {
  get: async () => {
    const params: Record<string, string> = {
      page: "0",
      size: "50",
    };

    const options: RequestInit = {
      method: "GET",
      headers: {
        Authorization: `Basic ${import.meta.env.VITE_TOKEN}`,
      },
    };

    const apiUrl = createApiUrl(SHOP_API.endpoint.cartItems, params);
    return await fetchWithErrorHandling<CartItems>(apiUrl, options);
  },
  post: async (productId: number) => {
    const options: RequestInit = {
      method: "POST",
      headers: {
        Authorization: `Basic ${import.meta.env.VITE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: productId,
        quantity: 1,
      }),
    };

    return await fetchWithErrorHandling(CART_ITEMS_BASE_URL, options, false);
  },
  delete: async (cartId: number) => {
    const options: RequestInit = {
      method: "DELETE",
      headers: {
        Authorization: `Basic ${import.meta.env.VITE_TOKEN}`,
      },
    };

    const apiUrl = `${SHOP_API.baseUrl}${SHOP_API.endpoint.cartItems}/${cartId}`;
    return await fetchWithErrorHandling(apiUrl, options, false);
  },
};
