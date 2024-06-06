export const API_URL = {
  cartItems: "cart-items",
  products: "products",
  cartItemCounts: "cart-items/counts",
  cartItem: (id: number) => `/cart-items/${id}`,
} as const;
