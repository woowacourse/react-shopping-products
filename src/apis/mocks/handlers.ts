import { http, HttpResponse } from "msw";
import productsData from "./dummy.json";
import { SHOP_API } from "../configs";

const productsUrl = `${SHOP_API.baseUrl}/products`
  .replace(/\/+/g, "/")
  .replace(":/", "://");

export const handlers = [
  http.get(productsUrl, ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get("category");
    const sort = url.searchParams.get("sort");

    let filteredProducts = productsData;
    if (category) {
      filteredProducts = filteredProducts.filter(
        (item) => item.category === category
      );
    }

    if (sort) {
      const [, sortOrderType] = sort.split(",");
      filteredProducts = filteredProducts.sort((a, b) => {
        const priceDelta = a.price - b.price;
        return sortOrderType === "desc" ? -priceDelta : priceDelta;
      });
    }

    const totalElements = filteredProducts.length;
    const totalPages = Math.ceil(filteredProducts.length / 20);

    return HttpResponse.json({
      content: filteredProducts,
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
