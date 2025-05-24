import { http, HttpResponse } from "msw";
import { mockProductResponse } from "../mockProductResponse";

export const productHandlers = [
  http.get(`${import.meta.env.VITE_BASE_URL}/products`, () => {
    return HttpResponse.json(mockProductResponse);
  }),

  http.get(`${import.meta.env.VITE_BASE_URL}/products/:id`, ({ params }) => {
    const { id } = params;
    return HttpResponse.json(
      mockProductResponse.content.find((product) => product.id === Number(id))
    );
  }),
];
