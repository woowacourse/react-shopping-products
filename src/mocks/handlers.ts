import { PRODUCTS, PATH, CONFIG, CART_ITEMS } from "@/constants";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get(`${CONFIG.apiUrl}${PATH.products}`, () => {
    return HttpResponse.json(PRODUCTS);
  }),

  // http.get(`${CONFIG.apiUrl}${PATH.cartItems}`, () => {
  //   return HttpResponse.json(CART_ITEMS);
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
