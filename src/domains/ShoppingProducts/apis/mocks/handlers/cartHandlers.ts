import { http, HttpResponse } from "msw";
import { mockCartItemResponse } from "../mockCartItemResponse";
import { mockProductResponse } from "../mockProductResponse";
import { CartItemType } from "../../types/cartItem";

export function createCartHandlers() {
  let cartItems: CartItemType[] = JSON.parse(
    JSON.stringify(mockCartItemResponse.content)
  );

  const resetCartItems = () => {
    cartItems = JSON.parse(JSON.stringify(mockCartItemResponse.content));
  };

  const findProductById = (id: number) => {
    const product = mockProductResponse.content.find(
      (product) => product.id === id
    );
    return product;
  };

  const errorResponse = (
    errorCode: string,
    message: string,
    status: number
  ) => {
    return HttpResponse.json(
      {
        errorCode,
        message,
      },
      { status }
    );
  };

  const cartHandlers = [
    http.get(`${import.meta.env.VITE_BASE_URL}/cart-items`, () => {
      return HttpResponse.json({
        ...mockCartItemResponse,
        content: cartItems,
      });
    }),

    http.post(
      `${import.meta.env.VITE_BASE_URL}/cart-items`,
      async ({ request }) => {
        const { productId, quantity } = (await request.json()) as {
          productId: number;
          quantity: number;
        };

        const product = findProductById(productId);

        if (!product)
          return errorResponse(
            "PRODUCT_NOT_FOUND",
            "존재하지 않는 상품입니다.",
            404
          );

        if ((product?.quantity ?? 10000) < quantity) {
          return errorResponse(
            "OUT_OF_STOCK",
            "재고 수량을 초과하여 담을 수 없습니다.",
            400
          );
        }

        const newItem = {
          id: Date.now(),
          productId,
          quantity,
          product,
        };

        cartItems.push(newItem);

        return HttpResponse.json({ status: 201 });
      }
    ),

    http.delete(
      `${import.meta.env.VITE_BASE_URL}/cart-items/:id`,
      ({ params }) => {
        const id = Number(params.id);
        cartItems = cartItems.filter((item) => item.id !== id);

        return HttpResponse.json({ status: 204 });
      }
    ),

    http.patch(
      `${import.meta.env.VITE_BASE_URL}/cart-items/:id`,
      async ({ params, request }) => {
        const id = Number(params.id);
        const { quantity } = (await request.json()) as { quantity: number };

        const item = cartItems.find((item) => item.id === id);

        if (!item)
          return errorResponse(
            "CART_NOT_FOUND",
            "존재하지 않는 장바구니 상품입니다.",
            404
          );

        const product = findProductById(item.product.id);

        if (quantity === 0) {
          cartItems = cartItems.filter((item) => item.id !== id);
        }

        if ((product?.quantity ?? 10000) < quantity) {
          return errorResponse(
            "OUT_OF_STOCK",
            "재고 수량을 초과하여 담을 수 없습니다.",
            400
          );
        }

        item.quantity = quantity;

        return HttpResponse.json({ status: 200 });
      }
    ),
  ];

  return { cartHandlers, resetCartItems };
}
