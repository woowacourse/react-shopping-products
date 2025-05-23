import { http, HttpResponse } from "msw";

const BASE_URL = "http://localhost:3000";

const handlers = [
  http.get(`${BASE_URL}/products`, () => {
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
