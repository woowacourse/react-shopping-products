import { http, HttpResponse } from "msw";
import { PRODUCTS_ENDPOINT } from "../api/endpoints";
import { PAGE } from "../constants";
import products from "./products.json";

export const handlers = [
  http.get(PRODUCTS_ENDPOINT, ({ request }) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get("page") || "0");
    const size = page === PAGE.FIRST_PAGE ? PAGE.FIRST_PAGE_LIMIT : PAGE.OTHER_PAGE_LIMIT;
    const category = url.searchParams.get("category");

    let filteredProducts = products.content;

    if (category && category !== "전체") {
      filteredProducts = filteredProducts.filter((product) => product.category === category);
    }

    const start =
      page === PAGE.FIRST_PAGE
        ? PAGE.FIRST_PAGE_START
        : PAGE.FIRST_PAGE_LIMIT + (page - 2) * PAGE.OTHER_PAGE_LIMIT;
    const end = start + size;
    const paginatedProducts = filteredProducts.slice(start, end);

    return HttpResponse.json({
      content: paginatedProducts,
      last: end >= filteredProducts.length,
    });
  }),
];
