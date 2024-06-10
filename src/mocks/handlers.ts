import { http, HttpResponse } from "msw";
import { API_URL } from "@/constants/api";
import sampleProducts from "./sampleProducts.json";
import sampleCart from "./sampleCart.json";

export const handlers = [
  http.get(`${API_URL}/product`, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 0;
    const category = url.searchParams.get("category");
    const sort = url.searchParams.get("sort");

    return HttpResponse.json({
      ...sampleProducts,
      content: sampleProducts.content
        .filter((product) => !category || product.category === category)
        .slice(page === 0 ? 0 : 20, page === 0 ? 20 : 20 + page * 1)
        .sort((a, b) => {
          if (a.price !== b.price) {
            return sort === "price,id,asc"
              ? a.price - b.price
              : b.price - a.price; // price를 기준으로 오름차순 정렬
          }
          return sort === "price,id,asc"
            ? a.price - b.price
            : b.price - a.price; // price가 같다면 id를 기준으로 오름차순 정렬
        }),
    });
  }),

  http.get(`${API_URL}/cart-items`, () => {
    return HttpResponse.json(sampleCart);
  }),
];
