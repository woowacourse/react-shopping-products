import { http, HttpResponse } from "msw";
import { mockProducts } from "./mockData";
import { baseUrl } from "../APIs/apiConfig";

let cartItems: { id: number; productId: number; quantity: number }[] = [];

export const handlers = [
  http.get(`${baseUrl}/products`, ({ request }) => {
    // product 리스트 조회
    const url = new URL(request.url);
    const sort = url.searchParams.get("sort") || "price,asc";
    const category = url.searchParams.get("category") || null;

    let filteredProducts = [...mockProducts];
    if (category) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === category
      );
    }

    const sortOrder = sort.split(",")[1] || "asc";

    filteredProducts.sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      return b.price - a.price;
    });

    return HttpResponse.json({
      content: filteredProducts,
      pageable: { pageNumber: 0, pageSize: 20 },
      totalElements: filteredProducts.length,
      totalPages: 1,
    });
  }),

  http.get(`${baseUrl}/cart-items`, () => {
    // cart 리스트 조회
    const cartItemContent = cartItems.map((item) => {
      const product = mockProducts.find((p) => p.id === item.productId);
      return {
        ...item,
        product,
      };
    });

    return HttpResponse.json({
      content: cartItemContent,
      pageable: { pageNumber: 0, pageSize: 50 },
      totalElements: cartItemContent.length,
      totalPages: 1,
    });
  }),

  http.post(`${baseUrl}/cart-items`, async ({ request }) => {
    // cart 아이템 추가ㄴ
    const body = (await request.json()) as {
      productId: number;
      quantity: number;
    };
    const { productId, quantity } = body;

    const product = mockProducts.find((p) => p.id === productId);

    const id = Date.now();
    const cartItem = { id, productId, quantity };
    cartItems.push(cartItem);

    return HttpResponse.json({
      ...cartItem,
      product,
    });
  }),

  http.delete(`${baseUrl}/cart-items/:id`, ({ params }) => {
    // cart 아이템 삭제
    const id = Number(params.id);
    const prevLength = cartItems.length;
    cartItems = cartItems.filter((item) => item.id !== id);

    return new HttpResponse(null, {
      status: prevLength === cartItems.length ? 404 : 204,
    });
  }),

  http.patch(`${baseUrl}/cart-items/:id`, async ({ params, request }) => {
    // cart 수량 변경
    const cartItemId = Number(params.id);
    const body = (await request.json()) as { quantity: number };

    const item = cartItems.find((item) => item.id === cartItemId);
    if (!item) return new HttpResponse(null, { status: 404 });
    item.quantity = body.quantity;

    const product = mockProducts.find((p) => p.id === item.productId);

    return HttpResponse.json({
      ...item,
      product,
    });
  }),
];
