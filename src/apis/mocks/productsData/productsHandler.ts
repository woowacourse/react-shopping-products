import { http } from "msw";
import { getProductsHandler } from "./getProductsHandler";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const PRODUCTS_URL = `${BASE_URL}/products`;

export const productsHandlers = [http.get(PRODUCTS_URL, getProductsHandler)];
