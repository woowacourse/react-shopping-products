import { AddItemBody } from "../../types/request.types";
import { products } from "../dummy/productDummy";
import { carts } from "../dummy/cartDummy";
import { HttpResponse, http } from "msw";

export const cartHandler = [
  http.get(`${import.meta.env.VITE_BASE_URL}/cart-items`, () => {
    return HttpResponse.json(carts);
  }),

  http.post(
    `${import.meta.env.VITE_BASE_URL}/cart-items`,
    async ({ request }) => {
      const body = await request.json();
      const { productId, quantity } = body as AddItemBody;

      const findItem = products.content.find((data) => data.id === productId);

      if (findItem)
        carts.content.push({
          id: carts.content.length,
          quantity,
          product: { ...findItem },
        });

      return HttpResponse.json(
        { message: "장바구니에 추가되었습니다." },
        { status: 201 }
      );
    }
  ),

  http.patch(
    `${import.meta.env.VITE_BASE_URL}/cart-items/:id`,
    async ({ request, params }) => {
      const body = await request.json();
      const { quantity } = body as { quantity: number };
      const { id: cartId } = params;

      const findIndex = carts.content.findIndex(
        (data) => data.id === Number(cartId)
      );
      const findItem = carts.content.find((data) => data.id === Number(cartId));

      if (findItem) {
        if (findItem.product.quantity < quantity) {
          return HttpResponse.json(
            { message: "장바구니에 담는 것을 실패했습니다." },
            { status: 500 }
          );
        }

        if (quantity === 0) {
          carts.content.filter((data) => data.id !== Number(cartId));
          return HttpResponse.json(
            { message: "장바구니에서 삭제했습니다." },
            { status: 201 }
          );
        }

        carts.content[findIndex] = {
          id: findItem.id,
          quantity: quantity,
          product: findItem.product,
        };
      }

      return HttpResponse.json(
        { message: "장바구니에 추가되었습니다." },
        { status: 201 }
      );
    }
  ),

  http.delete(
    `${import.meta.env.VITE_BASE_URL}/cart-items/:id`,
    async ({ params }) => {
      const { id: cartId } = params;

      carts.content = carts.content.filter(
        (data) => data.id !== Number(cartId)
      );

      return HttpResponse.json(
        { message: "장바구니에서 삭제했습니다." },
        { status: 201 }
      );
    }
  ),
];
