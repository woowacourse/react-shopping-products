import { HttpResponse, http } from "msw";

import { PRODUCTS_ENDPOINT } from "../api/endPoint";
import productsMockData from "./products.json";

export const handlers = [
  http.get(PRODUCTS_ENDPOINT, ({ request }) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get("page") || "1");
    const limit = page === 0 ? 20 : 4;
    const start = page === 0 ? 0 : (page - 4) * 4 + 20;
    const end = start + limit;

    const paginatedProducts = productsMockData.slice(start, end);

    const last = page === 23;

    return HttpResponse.json({ content: paginatedProducts, last });
  }),
];
