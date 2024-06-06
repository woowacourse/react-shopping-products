export const QUERY_KEYS = {
  products: "products",
  cartItems: "cartItems",
} as const;

export const MUTATION_KEYS = {
  createCartItem: "createCartItem",
  updateCartItem: "updateCartItem",
  deleteCartItem: "deleteCartItem",
} as const;
