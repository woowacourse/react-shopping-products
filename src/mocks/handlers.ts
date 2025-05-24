import { http, HttpResponse } from "msw";
import { END_POINT } from "../api/constants/endPoint";
import { mockProducts } from "./data/products";

export const handlers = [
  http.get(END_POINT.PRODUCT, () => {
    return HttpResponse.json({
      content: mockProducts,
    });
  }),

  http.get(`${END_POINT.PRODUCT}/:id`, ({ params }) => {
    const id = Number(params.id);
    const product = mockProducts.find((p) => p.id === id);

    if (!product) {
      return HttpResponse.json(
        { message: "상품을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return HttpResponse.json(product);
  }),
];
