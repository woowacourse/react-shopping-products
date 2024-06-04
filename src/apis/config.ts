import { generateBasicToken } from '../util/auth';

const API_URL = import.meta.env.VITE_API_URL;
export const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;
export const USER_ID = import.meta.env.VITE_USER_ID;
export const token = generateBasicToken(USER_ID, USER_PASSWORD);

export const END_POINTS = {
  PRODUCTS: `${API_URL}/products`,
  CART_ITEMS: `${API_URL}/cart-items`,
};

export const QUERY_KEYS = {
  PRODUCTS: 'products',
  CART_ITEMS: 'cart-items',
};
