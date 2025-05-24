import { http, HttpResponse } from "msw";

export const handlers = [
  http.get(`${import.meta.env.VITE_BASE_URL}/products`, ({ request }) => {
    const url = new URL(request.url);
    const params = url.searchParams;

    const category = params.get("category");
    const sort = params.get("sort");
    const page = parseInt(params.get("page") || "0");
    const size = parseInt(params.get("size") || "20");

    let products = [
      {
        id: 1,
        name: "에어포스",
        category: "패션잡화",
        price: 100000,
        imageUrl: "string",
        quantity: "50",
      },
      {
        id: 2,
        name: "후드티",
        category: "패션잡화",
        price: 50000,
        imageUrl: "string",
        quantity: "1",
      },
      {
        id: 3,
        name: "바나나",
        category: "식료품",
        price: 20000,
        imageUrl: "string",
        quantity: "5",
      },
    ];

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
    const data = products.slice(start, end);

    return HttpResponse.json({
      content: data,
    });
  }),
];
