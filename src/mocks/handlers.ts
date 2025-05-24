import { CONFIG, PATH } from "@/constants";
import { http, HttpResponse } from "msw";
import { CART_ITEMS_DATA } from "./datas/cartItems";
import { PRODUCTS_DATA } from "./datas/products";

export const handlers = [
  http.get(`${CONFIG.apiUrl}${PATH.products}`, () => {
    return HttpResponse.json(PRODUCTS_DATA);
  }),

  // http.get(`${CONFIG.apiUrl}${PATH.cartItems}`, () => {
  //   return HttpResponse.json(CART_ITEMS_DATA);
  // }),

  // http.get(`${CONFIG.apiUrl}${PATH.products}/:id`, ({ params }) => {
  //   const { id } = params;
  //   const product = PRODUCTS.content.find((p) => p.id === Number(id));
  //   if (!product) {
  //     return HttpResponse.json({ message: "Product not found" }, { status: 404 });
  //   }
  //   return HttpResponse.json(product);
  // }),

  // http.post(`${CONFIG.apiUrl}${PATH.cartItems}`, () => {
  //   return HttpResponse.json({ message: "Cart item created" });
  // }),

  // http.delete(`${CONFIG.apiUrl}${PATH.cartItems}`, () => {
  //   return HttpResponse.json({ message: "Cart item deleted" });
  // }),
];
