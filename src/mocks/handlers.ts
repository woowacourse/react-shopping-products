import { http, HttpResponse } from "msw";
import { END_POINT } from "../api/constants/endPoint";

export const handlers = [
  http.get(`${END_POINT.PRODUCT}/:id`, ({ params }) => {
    const { id } = params;
    return HttpResponse.json({
      id: Number(id),
      name: `에어포스${id}`,
      price: 100000,
      imageUrl: "https://via.placeholder.com/150",
      category: "패션잡화",
      quantity: 10,
    });
  }),
];
