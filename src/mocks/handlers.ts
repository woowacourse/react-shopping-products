import { CART_ITEMS_ENDPOINT, PRODUCTS_ENDPOINT } from "../api/endPoint";
import { CartItem, isValidCartItemRequestBody } from "../types/cartItems";
import { HttpResponse, http } from "msw";

import cartItemMockData from "./cartItems.json";
import productsMockData from "./products.json";

function CartMockClosure() {
  let cartMockData = JSON.parse(JSON.stringify(cartItemMockData));

  const getCartMockData = () => {
    return cartMockData;
  };

  const pushCartItem = (mockCartItem: CartItem) => {
    cartMockData.content = [...cartMockData.content, mockCartItem];
  };

  const deleteCartItem = (id: number) => {
    cartMockData.content = cartMockData.content.filter(
      (el: CartItem) => el.id !== id
    );
  };

  const resetCartItems = () => {
    cartMockData = JSON.parse(JSON.stringify(cartItemMockData));
  };

  return { getCartMockData, pushCartItem, deleteCartItem, resetCartItems };
}

export const cartMockClosure = CartMockClosure();

export const handlers = [
  http.get(PRODUCTS_ENDPOINT, () => {
    return HttpResponse.json({ content: productsMockData });
  }),

  http.get(CART_ITEMS_ENDPOINT, () =>
    HttpResponse.json(cartMockClosure.getCartMockData())
  ),

  http.post(CART_ITEMS_ENDPOINT, async ({ request }) => {
    const body = await request.json();

    if (!isValidCartItemRequestBody(body)) {
      throw new Error(
        "body로 주어진 값이 { productId, quantity} 형식이 아닙니다."
      );
    }

    cartMockClosure.pushCartItem(body);
    return HttpResponse.json({ status: 201 });
  }),

  http.delete(`${CART_ITEMS_ENDPOINT}/:id`, ({ params }) => {
    const { id } = params;
    const numberId = Number(id);

    if (Number.isNaN(numberId)) {
      throw new Error(`값이 숫자가 아닙니다.`);
    }

    cartMockClosure.deleteCartItem(numberId);
    return HttpResponse.json({ status: 204 });
  }),
];
