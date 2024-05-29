import { http, HttpResponse } from "msw";
import { PRODUCTS_ENDPOINT } from "../api/endpoints";
import products from "./products.json";
import { PAGE } from "../constants/page";

export const handlers = [
  http.get(PRODUCTS_ENDPOINT, ({ request }) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get("page") || "1");
    const limit = page === PAGE.FIRST_PAGE ? PAGE.FIRST_PAGE_LIMIT : PAGE.OTHER_PAGE_LIMIT;
    const start =
      page === PAGE.FIRST_PAGE
        ? PAGE.FIRST_PAGE_START
        : (page - PAGE.OTHER_PAGE_START) * PAGE.OTHER_PAGE_LIMIT + PAGE.FIRST_PAGE_LIMIT;
    const end = start + limit;

    const paginatedProducts = products.content.slice(start, end);

    return HttpResponse.json({ content: paginatedProducts });
  }),
];
