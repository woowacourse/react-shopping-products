import { http, HttpResponse } from "msw";

import { CART_ITEMS_ENDPOINT } from "../../../apis/config";
import productListData from "../productList/defaultData.json";
import cartItemListData from "./defaultData.json";
import { Product } from "../../../interfaces/Product";

export const cartItemListHandlers = [
  http.get(CART_ITEMS_ENDPOINT, ({}) => {
    return HttpResponse.json({ content: cartItemListData }, { status: 200 });
  }),

  http.post(`${CART_ITEMS_ENDPOINT}/cart-items`, async ({ request }) => {
    const { productId } = (await request.json()) as { productId: number };

    const product = productListData.find(
      (product: Product) => product.id === productId
    );

    const cartItemId =
      Math.max(0, ...cartItemListData.map((cartItem) => cartItem.id)) + 1;
    if (product) {
      cartItemListData.push({ id: cartItemId, product, quantity: 1 });
    }

    return HttpResponse.json({ content: cartItemListData });
  }),

  http.delete(CART_ITEMS_ENDPOINT, ({ params }) => {
    const { id } = params;
    const index = cartItemListData.findIndex(
      (item) => item.id === parseInt(id as string, 10)
    );
    if (index === -1) {
      return HttpResponse.json("장바구니에 없는 상품입니다.", { status: 400 });
    }
    cartItemListData.splice(index, 1);
    return HttpResponse.json({ content: cartItemListData });
  }),
];
