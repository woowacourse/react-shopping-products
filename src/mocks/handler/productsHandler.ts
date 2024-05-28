import { http, HttpResponse } from "msw";
import SERVER_URL from "@/config/serverUrl";
import products from "@/mocks/mockResponse/products.json";
import { END_POINT } from "@/config/endPoint";

export const productsHandler = [
  http.get(SERVER_URL.apiUrl + END_POINT.products, () => {
    return HttpResponse.json(products);
  }),
];
