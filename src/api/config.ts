import { generateBasicToken } from "../util/auth";

const API_URL = import.meta.env.VITE_API_URL;

export const PRODUCTS_ENDPOINT = `${API_URL}/products`;
export const CART_ITEMS_ENDPOINT = `${API_URL}/cart-items`;

export const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;
export const USER_ID = import.meta.env.VITE_USER_ID;
export const token = generateBasicToken(USER_ID, USER_PASSWORD);
