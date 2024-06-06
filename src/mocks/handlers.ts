import { http, HttpResponse } from "msw";
import { PRODUCTS_ENDPOINT } from "../api/endpoints";
import products from "./products.json";

export const PAGE = {
  FIRST_PAGE: 1,
  FIRST_PAGE_START: 0,
  OTHER_PAGE_START: 2,
  DEFAULT_SIZE: 20,
  ADDITIONAL_SIZE: 4,
};

export const handlers = [
  http.get(PRODUCTS_ENDPOINT, ({ request }) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get("page") || "1");
    const limit = page === PAGE.FIRST_PAGE ? PAGE.DEFAULT_SIZE : PAGE.ADDITIONAL_SIZE;
    const start =
      page === PAGE.FIRST_PAGE
        ? PAGE.FIRST_PAGE_START
        : (page - PAGE.OTHER_PAGE_START) * PAGE.ADDITIONAL_SIZE + PAGE.DEFAULT_SIZE;
    const end = start + limit;

    const paginatedProducts = products.content.slice(start, end);

    return HttpResponse.json({ content: paginatedProducts });
  }),
];
