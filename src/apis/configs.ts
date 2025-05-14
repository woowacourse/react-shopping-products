export const SHOP_API = {
  baseUrl: `${import.meta.env.VITE_API_BASE_URL}`,
  endpoint: {
    products: "products",
    cartItems: "cart-items",
  },
};

export const createApiUrl = (
  endpoint: string,
  params?: Record<string, string>
) => {
  const searchParams = new URLSearchParams(params);
  return `${SHOP_API.baseUrl}${endpoint}?${searchParams.toString()}`;
};
