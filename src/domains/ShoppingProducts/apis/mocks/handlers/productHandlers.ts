import { http, HttpResponse } from "msw";
import { mockProductResponse } from "../mockProductResponse";

export const productHandlers = [
  http.get(`${import.meta.env.VITE_BASE_URL}/products`, ({ request }) => {
    const url = new URL(request.url);
    const sort = url.searchParams.get("sort") as "price,asc" | "price,desc";
    const category = url.searchParams.get("category");
    const page = Number(url.searchParams.get("page") || "0");
    const size = Number(url.searchParams.get("size") || "20");

    let products = structuredClone(mockProductResponse.content);

    if (category && category !== "전체") {
      products = products.filter((p) => p.category === category);
    }

    if (sort === "price,asc") {
      products.sort((a, b) => a.price - b.price);
    } else if (sort === "price,desc") {
      products.sort((a, b) => b.price - a.price);
    }

    const start = page * size;
    const end = start + size;
    const paged = products.slice(start, end);

    return HttpResponse.json({
      content: paged,
      totalElements: products.length,
      totalPages: Math.ceil(products.length / size),
      page,
      size,
    });
  }),
  http.get(`${import.meta.env.VITE_BASE_URL}/products/:id`, ({ params }) => {
    const { id } = params;
    return HttpResponse.json(
      mockProductResponse.content.find((product) => product.id === Number(id))
    );
  }),
];
