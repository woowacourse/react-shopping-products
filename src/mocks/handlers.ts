import { http, HttpResponse } from "msw";
import products from "./products.json";

export const handlers = [
  http.get("URL", () => {
    return HttpResponse.json(products);
  }),
];
