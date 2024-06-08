import { http, HttpResponse } from 'msw';
import ENDPOINT from '../api/endpoints';

export const cartItemHandlers = [
  http.post(`${ENDPOINT.CART_ITEMS}`, () => {
    return HttpResponse.json({
      productId: 10,
      quantity: 1,
    });
  }),

  http.get(ENDPOINT.CART_ITEMS_COUNT, () => {
    return HttpResponse.json({
      quantity: 8,
    });
  }),

  http.get(`${ENDPOINT.CART_ITEMS}`, () => {
    return HttpResponse.json({
      content: [
        { id: 10, product: { id: 12 } },
        { id: 12, product: { id: 14 } },
      ],
    });
  }),

  http.patch(`${ENDPOINT.CART_ITEMS}/12`, () => {
    console.log('a');
    return HttpResponse.json({
      content: [],
    });
  }),

  http.delete(`${ENDPOINT.CART_ITEMS}/10`, () => {
    return HttpResponse.json(
      {
        itemId: 10,
      },
      { status: 200 },
    );
  }),
];
