import { http, HttpResponse } from 'msw';

import { END_POINTS } from '../../../apis/config';
import productListData from '../productList/defaultData.json';

import cartItemListData from './defaultData.json';

export const cartItemListHandlers = [
  http.get(END_POINTS.CART_ITEMS, () =>
    HttpResponse.json({ content: cartItemListData }, { status: 200 }),
  ),

  http.post(END_POINTS.CART_ITEMS, ({ params }) => {
    const { id } = params;
    const newItem = productListData.find(
      (item) => item.id === Number(id as string),
    );
    if (!newItem) {
      return HttpResponse.json('상품을 찾을 수 없습니다.', { status: 404 });
    }
    if (cartItemListData.some((item) => newItem.id === item.product.id)) {
      return HttpResponse.json('이미 장바구니에 상품이 있습니다.', {
        status: 400,
      });
    }
    cartItemListData.push({
      id: cartItemListData[cartItemListData.length - 1].id + 1,
      quantity: 1,
      product: newItem,
    });
    return HttpResponse.json({ status: 201 });
  }),

  http.delete(END_POINTS.CART_ITEMS, ({ params }) => {
    const { id } = params;
    const index = cartItemListData.findIndex(
      (item) => item.id === parseInt(id as string, 10),
    );
    if (index === -1) {
      return HttpResponse.json('장바구니에 없는 상품입니다.', { status: 400 });
    }
    return HttpResponse.json({ status: 204 });
  }),
];
