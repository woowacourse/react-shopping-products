const BASE_URL = import.meta.env.VITE_API_URL;

export const PRODUCTS_ENDPOINT = `${BASE_URL}/products`;

export const CART_ITEMS_ENDPOINT = `${BASE_URL}/cart-items`;

export const CART_ITEMS_COUNT_ENDPOINT = `${CART_ITEMS_ENDPOINT}/counts`;
