import { http, HttpResponse } from "msw";
import { mockProductResponse } from "./mockProductResponse";

export const handlers = [
  http.get("https://example.com/products", () => {
    return HttpResponse.json(mockProductResponse);
  }),
  http.get("https://example.com/products/:id", ({ params }) => {
    const { id } = params;
    return HttpResponse.json({
      id: Number(id),
      name: "프린세스 미용놀이",
      price: 1010,
      imageUrl:
        "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202204/19/ed8eddd4-0edd-40ad-af7d-44a171577c92.jpg",
      category: "패션잡화",
      quantity: 2,
    });
  }),
];
