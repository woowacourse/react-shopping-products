import { http, HttpResponse } from "msw";
import { ResponseProduct, ResponseCartItem } from "../api/types";

const API_URL = import.meta.env.VITE_BASE_URL;
console.log("API_URL", API_URL);

const createMockProducts = (size: number, page: number): ResponseProduct[] => {
  return Array.from({ length: size }, (_, index) => {
    const id = page * size + index + 1;
    return {
      id,
      name: `상품 ${id}`,
      price: 10000 * ((id % 5) + 1),
      imageUrl: `https://cdn.jsdelivr.net/gh/bunju20/bunju-blog-images@main/images/CleanShot%202025-05-21%20at%2012.28.14%402x.webp`,
      category: id % 2 === 0 ? "식료품" : "패션잡화",
      quantity: 50 - (id % 10),
    };
  });
};

const createMockCartItems = (): ResponseCartItem[] => {
  return Array.from({ length: 5 }, (_, index) => {
    const productId = index + 1;
    return {
      id: productId,
      quantity: (index % 3) + 1,
      product: {
        id: productId,
        name: `장바구니 상품 ${productId}`,
        price: 15000 * ((productId % 3) + 1),
        imageUrl: `https://cdn.jsdelivr.net/gh/bunju20/bunju-blog-images@main/images/CleanShot%202025-05-21%20at%2012.28.14%402x.webp`,
        category: productId % 2 === 0 ? "식료품" : "패션잡화",
        quantity: 50 - (productId % 10),
      },
    };
  });
};

export const handlers = [
  http.get(`${API_URL}/products`, ({ request }) => {
    console.log("MSW가 상품 목록 요청을 가로챘습니다:", request.url);

    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") || "0");
    const size = Number(url.searchParams.get("size") || "20");

    const products = createMockProducts(size, page);

    return HttpResponse.json({
      content: products,
      totalElements: 100,
      totalPages: 5,
      size,
      number: page,
    });
  }),

  http.get(`${API_URL}/cart-items`, ({ request }) => {
    console.log("MSW가 장바구니 목록 요청을 가로챘습니다:", request.url);

    const cartItems = createMockCartItems();

    return HttpResponse.json({
      content: cartItems,
      totalElements: cartItems.length,
      totalPages: 1,
      size: cartItems.length,
      number: 0,
    });
  }),

  http.post(`${API_URL}/cart-items`, async ({ request }) => {
    console.log("MSW가 장바구니 추가 요청을 가로챘습니다:", request.url);

    const body = await request.json();
    const { productId, quantity } = body as {
      productId: number;
      quantity: number;
    };

    if (quantity > 50) {
      return HttpResponse.json(
        {
          errorCode: "OUT_OF_STOCK",
          message: "재고 수량을 초과하여 담을 수 없습니다.",
        },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      {
        id: productId,
        quantity,
        product: {
          id: productId,
          name: `상품 ${productId}`,
          price: 12000,
          imageUrl: `https://cdn.jsdelivr.net/gh/bunju20/bunju-blog-images@main/images/CleanShot%202025-05-21%20at%2012.28.14%402x.webp`,
          category: "카테고리1",
        },
      },
      { status: 201 }
    );
  }),

  http.delete(`${API_URL}/cart-items/:id`, ({ params }) => {
    console.log("MSW가 장바구니 삭제 요청을 가로챘습니다:", params.id);

    return HttpResponse.json({}, { status: 204 });
  }),

  http.patch(`${API_URL}/cart-items/:id`, async ({ params, request }) => {
    console.log("MSW가 장바구니 수정 요청을 가로챘습니다:", params.id);

    const body = await request.json();
    const { quantity } = body as { quantity: number };
    const productId = Number(params.id);

    if (quantity > 50) {
      return HttpResponse.json(
        {
          errorCode: "OUT_OF_STOCK",
          message: "재고 수량을 초과하여 담을 수 없습니다.",
        },
        { status: 400 }
      );
    }

    return HttpResponse.json({
      id: productId,
      quantity,
      product: {
        id: productId,
        name: `상품 ${productId}`,
        price: 15000,
        imageUrl: `https://cdn.jsdelivr.net/gh/bunju20/bunju-blog-images@main/images/CleanShot%202025-05-21%20at%2012.28.14%402x.webp`,
        category: "카테고리1",
      },
    });
  }),
];
