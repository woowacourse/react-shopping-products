import { http, HttpResponse } from "msw";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/cart-items`;

import { cartItems } from "../data/mockCartItem";

const getCartItems = http.get(BASE_URL, ({ request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page");
  const size = url.searchParams.get("size");

  const response = {
    content: cartItems,
    pageable: {
      pageNumber: Number.parseInt(page || "0", 10),
      pageSize: Number.parseInt(size || "20", 10),
      sort: { empty: true, sorted: true, unsorted: true },
      offset: 0,
      paged: true,
      unpaged: false,
    },
    last: true,
    totalPages: 1,
    totalElements: 0,
    size: 20,
    numberOfElements: 0,
    first: true,
    empty: true,
  };

  return HttpResponse.json(response);
});

const cartItemHandler = [getCartItems];

export default cartItemHandler;
