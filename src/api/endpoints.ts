// export const TEST_BASE_URL = 'http://wooteco.com';
export const BASE_URL = import.meta.env.VITE_API_URL;
export const PRODUCTS_ENDPOINT = `${BASE_URL}/products`;
export const CART_ITEMS_ENDPOINT = `${BASE_URL}/cart-items`;
