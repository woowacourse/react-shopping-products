import { http, HttpResponse } from "msw";
import { cartItemsMockData } from "./cartItemsMockData";
import { productsMockData } from "../productsData/productsMockData";
import { ProductItemType } from "@/apis/products/product.type";
import {
  AddCartItems,
  UpdateCartItemQuantity,
} from "@/apis/cartItems/cartItem.type";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const CART_ITEMS_URL = `${BASE_URL}/cart-items`;

let cartItemSequence = 1;

export const cartItemsHandlers = [
  // 장바구니 상품 목록 조회
  http.get(CART_ITEMS_URL, () => {
    return HttpResponse.json(cartItemsMockData, { status: 200 });
  }),
  // 장바구니 상품 추가
  http.post<never, AddCartItems>(CART_ITEMS_URL, async ({ request }) => {
    const { productId, quantity } = await request.json();
    const product = productsMockData.content.find(
      ({ id }) => id === productId
    ) as ProductItemType;

    cartItemsMockData.content.push({
      id: cartItemSequence++,
      quantity,
      product,
    });
    return HttpResponse.json(
      {
        message: "장바구니에 상품을 담았습니다.",
      },
      { status: 201 }
    );
  }),
  // 장바구니 상품 삭제
  http.delete(`${CART_ITEMS_URL}/:id`, ({ params }) => {
    const cartItemId = params.id;
    const cartItemIndex = cartItemsMockData.content.findIndex(
      ({ id }) => id === Number(cartItemId)
    );

    cartItemsMockData.content.splice(cartItemIndex, 1);
    return HttpResponse.json(null, { status: 204 });
  }),
  // 장바구니 상품 수량 변경
  http.patch<{ id: string }, UpdateCartItemQuantity>(
    `${CART_ITEMS_URL}/:id`,
    async ({ request, params }) => {
      const { quantity } = await request.json();
      const cartItemId = params.id;
      const cartItemIndex = cartItemsMockData.content.findIndex(
        ({ id }) => id === Number(cartItemId)
      );
      const productQuantity = cartItemsMockData.content[cartItemIndex].quantity;
      if (productQuantity < quantity) {
        return HttpResponse.json(
          {
            errorCode: "OUT_OF_STOCK",
            message: "재고 수량을 초과하여 담을 수 없습니다.",
          },
          { status: 409 }
        );
      }

      cartItemsMockData.content[cartItemIndex].quantity = Number(quantity);
      return HttpResponse.json(
        {
          message: "장바구니 상품 수량을 변경했습니다.",
        },
        { status: 200 }
      );
    }
  ),
];
