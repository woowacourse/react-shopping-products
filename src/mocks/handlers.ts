import { http, HttpResponse } from "msw";
import { CART_API_URL } from "../envVariables";
import { API_URL } from "../constants/url";
import products from "./products.json";
import { SORT_OPTIONS } from "../api/products/constants";

export const handlers = [
  http.get(CART_API_URL + "/" + API_URL.products, ({ request }) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get("page") || "0");
    const size = Number(url.searchParams.get("size") || "20");
    const category = url.searchParams.get("category");
    const sort = url.searchParams.get("sort")?.split(",");

    const start = page * size;
    const end = start + size;

    const paginatedProducts = products.slice(start, end);
    const filteredProducts = paginatedProducts.map((product) => ({
      ...product,
      category,
    }));

    const [sortKey, sortValue] = sort || [null, null];
    const isPriceSort = sortKey === "price";
    const sortedProducts = filteredProducts.sort((a, b) => {
      if (!isPriceSort) {
        return 0;
      }

      if (typeof sortValue === "string" && sortValue === SORT_OPTIONS.asc) {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    return HttpResponse.json({
      content: sortedProducts,
      lastPage: end >= products.length,
    });
  }),
];
