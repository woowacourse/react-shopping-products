export const API_URL = {
  cartItems: "cart-items",
  products: "products",
  cartItem: (id: number) => `/cart-items/${id}`,
} as const;
