import { http, HttpResponse } from "msw";
import { mockProductResponse } from "../mockProductResponse";

export const productHandlers = [
  http.get("https://example.com/products", () => {
    return HttpResponse.json(mockProductResponse);
  }),

  http.get("https://example.com/products/:id", ({ params }) => {
    const { id } = params;
    return HttpResponse.json(
      mockProductResponse.content.find((product) => product.id === Number(id))
    );
  }),
];
