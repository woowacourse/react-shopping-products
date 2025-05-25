import { createApiUrl, fetchWithErrorHandling, SHOP_API } from "./configs";
import { CartItems } from "./types/cartItems";
import { PaginationParams } from "./types/pagination";
import { isErrorResponse } from "../utils/typeGuard";

export const CartItemsAPI = {
  get: async (): Promise<CartItems> => {
    const params: PaginationParams = {
      page: 0,
      size: 50,
    };

    const options: RequestInit = {
      method: "GET",
      headers: {
        Authorization: `Basic ${import.meta.env.VITE_TOKEN}`,
      },
    };

    const apiUrl = createApiUrl(SHOP_API.endpoint.cartItems, params);
    const response = await fetchWithErrorHandling<CartItems>(apiUrl, options);

    if (isErrorResponse(response)) {
      throw new Error(response.error);
    }

    return response as CartItems;
  },

  post: async (productId: number): Promise<void> => {
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

    const apiUrl = createApiUrl(SHOP_API.endpoint.cartItems);
    const response = await fetchWithErrorHandling(apiUrl, options, false);

    if (isErrorResponse(response)) {
      throw new Error(response.error);
    }
  },

  updateQuantity: async (cartId: number, quantity: number): Promise<void> => {
    const endpoint = `${SHOP_API.endpoint.cartItems}/${cartId}`;
    const apiUrl = createApiUrl(endpoint);

    const options: RequestInit = {
      method: "PATCH",
      headers: {
        Authorization: `Basic ${import.meta.env.VITE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: quantity,
      }),
    };

    const response = await fetchWithErrorHandling(apiUrl, options, false);

    if (isErrorResponse(response)) {
      throw new Error(response.error);
    }
  },

  delete: async (cartId: number): Promise<void> => {
    const endpoint = `${SHOP_API.endpoint.cartItems}/${cartId}`;
    const apiUrl = createApiUrl(endpoint);

    const options: RequestInit = {
      method: "DELETE",
      headers: {
        Authorization: `Basic ${import.meta.env.VITE_TOKEN}`,
      },
    };

    const response = await fetchWithErrorHandling(apiUrl, options, false);

    if (isErrorResponse(response)) {
      throw new Error(response.error);
    }
  },
};
