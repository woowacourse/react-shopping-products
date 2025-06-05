import { products } from "../dummy/productDummy";
import { HttpResponse, http } from "msw";

export const productHandler = [
  http.get(`${import.meta.env.VITE_BASE_URL}/products`, () => {
    return HttpResponse.json(products);
  }),
];
