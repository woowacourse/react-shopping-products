import { http, HttpResponse } from "msw";

import { CART_ITEMS_ENDPOINT, PRODUCTS_ENDPOINT } from "../api/config";
import { PRODUCT_LIST } from "../constants/productList";
import cartItemData from "./fetchedCartItemList.json";
import productData from "./fetchedProductsList.json";

export const handlers = [
  http.get(PRODUCTS_ENDPOINT, ({ request }) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get("page") || "0");
    const limit =
      page === 0
        ? PRODUCT_LIST.initialPageProductQuantity
        : PRODUCT_LIST.additionalPageProductQuantity;
    const start = page === 0 ? 0 : (page - 5) * 4 + 20;
    const end = start + limit;

    const paginatedProducts = productData.content.slice(start, end);
    const isLastPage = page === 38 ? true : false;
    return HttpResponse.json({ content: paginatedProducts, last: isLastPage });
  }),

  http.get(CART_ITEMS_ENDPOINT, () => {
    const cartItems = cartItemData.content;

    return HttpResponse.json(cartItems);
  }),
];
