const BASE_URL = import.meta.env.VITE_API_URL;

const ENDPOINT = {
  PRODUCTS: `${BASE_URL}/products`,
  CART_ITEMS: `${BASE_URL}/cart-items`,
  CART_ITEMS_COUNT: `${BASE_URL}/cart-items/counts`,
};
export default ENDPOINT;
