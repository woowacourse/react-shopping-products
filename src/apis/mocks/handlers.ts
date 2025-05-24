import { http, HttpResponse } from "msw";
import productsData from "./dummy.json";
import { SHOP_API } from "../configs";

const productsUrl = `${SHOP_API.baseUrl}/products`
  .replace(/\/+/g, "/")
  .replace(":/", "://");

export const handlers = [
  http.get(productsUrl, () => {
    const totalElements = productsData.length;
    const totalPages = Math.ceil(totalElements / 20);

    return HttpResponse.json({
      content: productsData,
      pageable: {
        pageNumber: 0,
        pageSize: 20,
        sort: {
          empty: false,
          sorted: true,
          unsorted: false,
        },
        offset: 0,
        paged: true,
        unpaged: false,
      },
      last: totalElements <= 20,
      totalElements,
      totalPages,
      size: 20,
      number: 0,
      sort: {
        empty: false,
        sorted: true,
        unsorted: false,
      },
      first: true,
      numberOfElements: productsData.slice(0, 20).length,
      empty: productsData.length === 0,
    });
  }),
];
