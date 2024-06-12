import { http, HttpResponse } from 'msw';

import { END_POINTS } from '../../../apis/config';

import cartItemListData from './defaultData.json';

export const cartItemListHandlers = [
  http.get(END_POINTS.CART_ITEMS, () =>
    HttpResponse.json({ content: cartItemListData }, { status: 200 }),
  ),

  http.post(END_POINTS.CART_ITEMS, async () => {
    return HttpResponse.json({ status: 201 });
  }),

  http.delete(`${END_POINTS.CART_ITEMS}/:id`, () => {
    return HttpResponse.json({ status: 204 });
  }),

  http.patch(`${END_POINTS.CART_ITEMS}/:id`, () => {
    return HttpResponse.json({ status: 200 });
  }),
];
