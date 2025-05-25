import { http, HttpResponse } from "msw";
import { END_POINT } from "../api/constants/endPoint";
import { mockProducts } from "./data/products";
import { mockCartItems } from "./data/cartItems";

export const handlers = [
  http.get(END_POINT.PRODUCT, ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get("category");
    const sort = url.searchParams.get("sort");

    let result = [...mockProducts];

    if (category) {
      result = result.filter((product) => product.category === category);
    }

    if (sort === "price,asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price,desc") {
      result.sort((a, b) => b.price - a.price);
    }

    const page = Number(url.searchParams.get("page")) || 0;
    const size = Number(url.searchParams.get("size")) || 20;
    const paginated = result.slice(page * size, (page + 1) * size);

    return HttpResponse.json({
      content: paginated,
      page,
      size,
      totalElements: result.length,
    });
  }),

  http.get(END_POINT.CART, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 0;
    const size = Number(url.searchParams.get("size")) || 50;

    const paginated = mockCartItems.slice(page * size, (page + 1) * size);

    return HttpResponse.json({
      content: paginated,
      page,
      size,
      totalElements: mockCartItems.length,
    });
  }),

  http.post(END_POINT.CART, async ({ request }) => {
    const { productId, quantity } = (await request.json()) as {
      productId: number;
      quantity: number;
    };

    const product = mockProducts.find((p) => p.id === productId);

    if (!product) {
      return HttpResponse.json(
        { errorCode: "NOT_FOUND", message: "상품을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    if (quantity > product.quantity) {
      return HttpResponse.json(
        {
          errorCode: "OUT_OF_STOCK",
          message: "재고 수량을 초과하여 담을 수 없습니다.",
        },
        { status: 400 }
      );
    }

    const existing = mockCartItems.find((item) => item.productId === productId);

    if (existing) {
      existing.quantity += quantity;
    } else {
      mockCartItems.push({
        id: Date.now(),
        productId,
        quantity,
        product,
      });
    }

    return HttpResponse.json({}, { status: 200 });
  }),

  http.delete(`${END_POINT.CART}/:id`, ({ params }) => {
    const basketId = Number(params.id);
    const index = mockCartItems.findIndex((item) => item.id === basketId);

    if (index === -1) {
      return HttpResponse.json(
        {
          errorCode: "NOT_FOUND",
          message: "장바구니 항목을 찾을 수 없습니다.",
        },
        { status: 404 }
      );
    }

    mockCartItems.splice(index, 1);

    return HttpResponse.json({}, { status: 200 });
  }),
];
