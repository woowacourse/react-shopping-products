import { http, HttpResponse } from "msw";

import { CART_ITEMS_ENDPOINT } from "../../../apis/config";
import productListData from "../productList/defaultData.json";
import cartItemListData from "./defaultData.json";

const mockCartItemList = cartItemListData;

export const cartItemListHandlers = [
  http.get(CART_ITEMS_ENDPOINT, ({}) => {
    return HttpResponse.json({ content: mockCartItemList }, { status: 200 });
  }),

  http.post(CART_ITEMS_ENDPOINT, ({ params }) => {
    const { id } = params;
    const newItem = productListData.find(
      (item) => item.id === parseInt(id as string)
    );
    if (!newItem) {
      return HttpResponse.json("상품을 찾을 수 없습니다.", { status: 404 });
    }
    if (mockCartItemList.some((item) => newItem.id === item.product.id)) {
      return HttpResponse.json("이미 장바구니에 상품이 있습니다.", {
        status: 400,
      });
    }
    mockCartItemList.push({
      id: mockCartItemList[mockCartItemList.length - 1].id + 1,
      quantity: 1,
      product: newItem,
    });
    return HttpResponse.json({ status: 201 });
  }),

  http.delete(CART_ITEMS_ENDPOINT, ({ params }) => {
    const { id } = params;
    const index = mockCartItemList.findIndex(
      (item) => item.id === parseInt(id as string, 10)
    );
    if (index === -1) {
      return HttpResponse.json("장바구니에 없는 상품입니다.", { status: 400 });
    }
    mockCartItemList.splice(index, 1);
    return HttpResponse.json({ status: 204 });
  }),
];
