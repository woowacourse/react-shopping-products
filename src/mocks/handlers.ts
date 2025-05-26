import { http, HttpResponse } from "msw";
import productData from "./products.json";
import cartItemData from "./cartItem.json";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const handlers = [
  http.get(`${baseUrl}/products`, ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get("category");
    const sort = url.searchParams.get("sort");

    let filtered = [...productData.content];

    if (category) {
      filtered = filtered.filter((item) => item.category === category);
    }

    if (sort === "price,asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "price,desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return HttpResponse.json({
      content: filtered,
    });
  }),

  http.get(`${baseUrl}/cart-items`, () => {
    return HttpResponse.json(cartItemData);
  }),

  //상품 상세 조회
  http.get(`${baseUrl}/products/:id`, ({ params }) => {
    const { id } = params;
    const product = productData.content.find((item) => item.id === Number(id));
    if (!product) {
      return HttpResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return HttpResponse.json(product);
  }),

  // 장바구니 상품 목록 조회
  http.get(`${baseUrl}/cart-items/:id`, ({ params }) => {
    const { id } = params;
    const cartItem = cartItemData.content.find(
      (item) => item.id === Number(id)
    );

    if (!cartItem) {
      return HttpResponse.json(
        { message: "Cart item not found" },
        { status: 404 }
      );
    }

    return HttpResponse.json(cartItem);
  }),

  //장바구니에 상품 추가
  http.post(`${baseUrl}/cart-items`, async ({ request }) => {
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

    const newCartItem = {
      id: productId,
      quantity,
      product: productData.content.find((p) => p.id === productId)!,
    };

    cartItemData.content.push(newCartItem);
    return HttpResponse.json(newCartItem);
  }),

  // 장바구니 상품 수량 변경
  http.patch(`${baseUrl}/cart-items/:id`, async ({ params, request }) => {
    const { id } = params;
    const body = await request.json();

    const { quantity } = body as { quantity: number };

    const item = cartItemData.content.find((item) => item.id === Number(id));
    if (!item) {
      return HttpResponse.json(
        { message: "Cart item not found" },
        { status: 404 }
      );
    }
    item.quantity = quantity;

    return HttpResponse.json(item);
  }),

  http.delete(`${baseUrl}/cart-items/:id`, ({ params }) => {
    const { id } = params;
    const targetIndex = cartItemData.content.findIndex(
      (item) => item.id === Number(id)
    );

    if (targetIndex === -1) {
      return HttpResponse.json(
        { message: "Cart item not found" },
        { status: 404 }
      );
    }
    const deletedItem = cartItemData.content.splice(targetIndex, 1)[0];

    return HttpResponse.json(deletedItem);
  }),
];
