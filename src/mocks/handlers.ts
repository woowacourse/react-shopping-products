import { http, HttpResponse } from "msw";

const handlers = [
  http.get(`${import.meta.env.VITE_BASE_URL}/products`, () => {
    const products = [
      {
        id: 1,
        name: "에어포스",
        price: 100000,
        imageUrl: "string",
        category: "string",
        quantity: 50,
      },
    ];
    return HttpResponse.json(products);
  }),
];

export { handlers };
