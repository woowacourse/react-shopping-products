import { http, HttpResponse } from "msw";
import SERVER_URL from "../../config/serverUrl";
import products from "../products.json";

export const productsHandler = [
  http.get(SERVER_URL.apiUrl, () => {
    return HttpResponse.json(products);
  }),
];
