import { http, HttpResponse } from "msw";
import { API_ENDPOINTS } from "../api/endpoints";
import products from "./products.json";

export const PAGE = {
  FIRST_PAGE: 0,
  FIRST_PAGE_START: 0,
  OTHER_PAGE_START: 2,
  DEFAULT_SIZE: 20,
  ADDITIONAL_SIZE: 4,
};

export const handlers = [
  http.get(API_ENDPOINTS.PRODUCTS, ({ request }) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get("page") || "1");
    const limit = page === PAGE.FIRST_PAGE ? PAGE.DEFAULT_SIZE : PAGE.ADDITIONAL_SIZE;
    const start =
      page === PAGE.FIRST_PAGE
        ? PAGE.FIRST_PAGE_START
        : (page - PAGE.OTHER_PAGE_START) * PAGE.ADDITIONAL_SIZE + PAGE.DEFAULT_SIZE;
    const end = start + limit;

    const paginatedProducts = products.content.slice(start, end);

    return HttpResponse.json({
      content: paginatedProducts,
      pageable: {
        sort: {
          sorted: false,
          unsorted: true,
          empty: true,
        },
        pageNumber: page,
        pageSize: 20,
        offset: 0,
        paged: true,
        unpaged: false,
      },
      last: page >= 24,
      totalPages: 100,
      totalElements: 100,
      sort: {
        sorted: false,
        unsorted: true,
        empty: true,
      },
      first: true,
      number: 0,
      numberOfElements: 100,
      size: 20,
      empty: false,
    });
  }),

  http.post(
    `${API_ENDPOINTS.CART}`,
    async ({ request }: { request: { json: () => Promise<Cart> } }) => {
      const newCartItem = await request.json();
      return HttpResponse.json(newCartItem, { status: 201 });
    }
  ),
];
