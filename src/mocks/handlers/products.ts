import { http, HttpResponse } from "msw";

import { ENDPOINT } from "../../constants/apis";

import {
  ProductsUnfilteredInitial,
  ProductsUnfilteredLast,
  ProductsFilteredBooksInitial,
  ProductsFilteredBooksLast,
  ProductsUnfilteredSortedDescInitial,
  ProductsUnfilteredSortedDescLast,
} from "../data";

const productHandlers = [
  http.get(ENDPOINT.PRODUCT, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") || "0");
    const category = url.searchParams.get("category");
    const sort = url.searchParams.get("sort") || "price,asc";

    if (!category && sort === "price,asc") {
      if (page === 0) return HttpResponse.json(ProductsUnfilteredInitial);

      return HttpResponse.json(ProductsUnfilteredLast);
    }

    if (!category && sort === "price,desc") {
      if (page === 0) return HttpResponse.json(ProductsUnfilteredSortedDescInitial);

      return HttpResponse.json(ProductsUnfilteredSortedDescLast);
    }

    if (category === "books" && sort === "price,asc") {
      if (page === 0) return HttpResponse.json(ProductsFilteredBooksInitial);

      return HttpResponse.json(ProductsFilteredBooksLast);
    }
  }),
];

export default productHandlers;
