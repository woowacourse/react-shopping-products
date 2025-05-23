import { http, HttpResponse } from "msw";

const BASE_URL = "http://localhost:3000";

const handlers = [
  http.get(`${BASE_URL}/products`, () => {
    const products = [
      {
        category: "Fruits",
        price: "$1",
        stocked: true,
        name: "Apple",
      },
    ];
    return HttpResponse.json(products);
  }),
];

export { handlers };
