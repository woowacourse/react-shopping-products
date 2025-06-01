import { http } from "msw";
import { getCartItemsHandler } from "./getCartItemsHandler";
import { addCartItemHandler } from "./addCartItemHandler";
import { deleteCartItemHandler } from "./deleteCartItemHandler";
import { updateCartItemQuantityHandler } from "./updateCartItemQuantityHandler";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const CART_ITEMS_URL = `${BASE_URL}/cart-items`;

export const cartItemsHandlers = [
  http.get(CART_ITEMS_URL, getCartItemsHandler),
  http.post(CART_ITEMS_URL, addCartItemHandler),
  http.delete(`${CART_ITEMS_URL}/:id`, deleteCartItemHandler),
  http.patch(`${CART_ITEMS_URL}/:id`, updateCartItemQuantityHandler),
];
