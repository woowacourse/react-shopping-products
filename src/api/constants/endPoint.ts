const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const END_POINT = Object.freeze({
  PRODUCT: `${BASE_URL}/products`,
  CART: `${BASE_URL}/cart-items`,
  CART_COUNT: `${BASE_URL}/cart-items/counts`,
});
