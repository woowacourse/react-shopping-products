import { createApiUrl, SHOP_API } from "./configs";

export const CartItemsAPI = {
  get: async () => {
    const params: Record<string, string> = {
      page: "0",
      size: "50",
    };

    const options = {
      method: "GET",
      headers: {
        Authorization: `Basic ${import.meta.env.VITE_TOKEN}`,
      },
    };

    const apiUrl = createApiUrl(SHOP_API.endpoint.cartItems, params);
    const response = await fetch(apiUrl, options);

    return await response.json();
  },
  post: async (productId: number) => {
    const options = {
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
    await fetch(apiUrl, options);
  },
  delete: async (cartId: number) => {
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Basic ${import.meta.env.VITE_TOKEN}`,
      },
    };

    const apiUrl = `${SHOP_API.baseUrl}${SHOP_API.endpoint.cartItems}/${cartId}`;
    await fetch(apiUrl, options);
  },
};
