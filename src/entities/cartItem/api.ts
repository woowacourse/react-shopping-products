import { ApiError, createApiUrl, fetchAPI } from "../../shared/api/apiClient";
import { SHOP_API } from "../../shared/api/config";
import { CartItems } from "./response";

const CART_ITEMS_BASE_URL = createApiUrl(SHOP_API.endpoint.cartItems);

export const CartItemsAPI = {
  get: async (): Promise<CartItems | ApiError> => {
    const params: Record<string, string> = {
      page: "0",
      size: "50",
    };

    const options: RequestInit = { method: "GET" };
    const apiUrl = createApiUrl(SHOP_API.endpoint.cartItems, params);
    return await fetchAPI<CartItems>(apiUrl, options);
  },

  post: async (productId: number): Promise<void | ApiError> => {
    const options: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity: 1 }),
    };

    return await fetchAPI(CART_ITEMS_BASE_URL, options, false);
  },

  delete: async (cartId: number): Promise<void | ApiError> => {
    const options: RequestInit = { method: "DELETE" };
    const apiUrl = `${SHOP_API.baseUrl}${SHOP_API.endpoint.cartItems}/${cartId}`;
    return await fetchAPI(apiUrl, options, false);
  },

  patch: async (cartId: number, quantity: number): Promise<void | ApiError> => {
    const options: RequestInit = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: cartId, quantity }),
    };
    const apiUrl = `${SHOP_API.baseUrl}${SHOP_API.endpoint.cartItems}/${cartId}`;
    return await fetchAPI(apiUrl, options, false);
  },
};
