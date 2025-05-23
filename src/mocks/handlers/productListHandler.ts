import { http, HttpResponse } from "msw";

import { allProductsData } from "../data/mockProducts";
import {
  ALL_CATEGORY,
  HIGH_PRICE_SORT_KEY,
  LOW_PRICE_SORT_KEY,
} from "../../constants/filterOptions";

export const productListHandler = http.get(
  `${import.meta.env.VITE_BASE_URL}/products`,
  ({ request }) => {
    const url = new URL(request.url);
    const categoryFilter = url.searchParams.get("category");
    const sortParam = url.searchParams.get("sort");
    const page = url.searchParams.get("page");
    const size = url.searchParams.get("size");

    let filteredProducts = [...allProductsData];

    if (categoryFilter && categoryFilter !== ALL_CATEGORY) {
      filteredProducts = filteredProducts.filter(
        (item) => item.category === categoryFilter
      );
    }

    if (sortParam) {
      filteredProducts.sort((a, b) => {
        const priceA = a.price;
        const priceB = b.price;
        if (sortParam === LOW_PRICE_SORT_KEY) {
          return priceA - priceB;
        } else if (sortParam === HIGH_PRICE_SORT_KEY) {
          return priceB - priceA;
        }
        return 0;
      });
    }

    const pageNumber = Number.parseInt(page || "0", 10);
    const pageSize = Number.parseInt(size || "20", 10);
    const startIndex = pageNumber * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    const response = {
      content: paginatedProducts.map((item) => ({
        ...item,
      })),
      pageable: {
        pageNumber: pageNumber,
        pageSize: pageSize,
        sort: sortParam
          ? { empty: false, sorted: true, unsorted: false }
          : { empty: true, sorted: true, unsorted: true },
        offset: startIndex,
        paged: true,
        unpaged: false,
      },
      last: endIndex >= filteredProducts.length,
      totalElements: filteredProducts.length,
      totalPages: Math.ceil(filteredProducts.length / pageSize),
      size: pageSize,
      number: pageNumber,
      sort: sortParam
        ? { empty: false, sorted: true, unsorted: false }
        : { empty: true, sorted: true, unsorted: true },
      first: pageNumber === 0,
      numberOfElements: paginatedProducts.length,
      empty: paginatedProducts.length === 0,
    };

    return HttpResponse.json(response);
  }
);
