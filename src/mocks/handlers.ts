import { CONFIG, PATH } from "@/constants";
import { http, HttpResponse } from "msw";
import { CART_ITEMS_DATA } from "./datas/cartItems";
import { PRODUCTS_DATA } from "./datas/products";

let cartItems = [...CART_ITEMS_DATA.content];

export const handlers = [
  /** Mocking products API */
  http.get(`${CONFIG.apiUrl}${PATH.products}`, () => {
    return HttpResponse.json(PRODUCTS_DATA);
  }),

  /** Mocking cartItems API */
  http.get(`${CONFIG.apiUrl}${PATH.cartItems}`, () => {
    return HttpResponse.json({ content: cartItems });
  }),

  http.post(`${CONFIG.apiUrl}${PATH.cartItems}`, async ({ request }) => {
    const { productId, quantity = 1 } = await request.json();
    const newId = cartItems.length ? Math.max(...cartItems.map((item) => item.id)) + 1 : 1;
    const newItem = {
      id: newId,
      quantity,
      product: PRODUCTS_DATA.content.find((product) => product.id === productId),
    };
    cartItems.push(newItem);
    return HttpResponse.json(newItem, { status: 201 });
  }),

  http.delete(`${CONFIG.apiUrl}${PATH.cartItems}/:cartItemId`, ({ params }) => {
    const { cartItemId } = params;
    cartItems = cartItems.filter((item) => item.id !== Number(cartItemId));
    return HttpResponse.json({ message: "Cart item deleted" });
  }),

  http.patch(`${CONFIG.apiUrl}${PATH.cartItems}/:cartItemId`, async ({ params, request }) => {
    const { cartItemId } = params;
    const { quantity } = await request.json();
    const item = cartItems.find((item) => item.id === Number(cartItemId));
    if (!item) return HttpResponse.json({ message: "Cart item not found" }, { status: 404 });

    item.quantity = quantity;
    return HttpResponse.json(item);
  }),
];
