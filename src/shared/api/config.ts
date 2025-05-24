export const SHOP_API = {
  baseUrl: `${import.meta.env.VITE_API_BASE_URL}`,
  endpoint: {
    products: "products",
    cartItems: "cart-items",
  },
  headers: {
    default: {
      Authorization: `Basic ${import.meta.env.VITE_TOKEN}`,
    },
  },
};
