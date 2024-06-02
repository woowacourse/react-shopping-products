import { http, HttpResponse } from 'msw';
import products from './data.json';
import {
  CART_ITEMS_COUNT_ENDPOINT,
  CART_ITEMS_ENDPOINT,
  PRODUCTS_ENDPOINT,
} from '../api/endpoints';
import {
  INITIAL_DATA_LOAD_COUNT,
  SUBSEQUENT_DATA_LOAD_COUNT,
} from '../constants';

export const handlers = [
  http.get(`${PRODUCTS_ENDPOINT}`, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || '0');
    const limit =
      page === 0 ? INITIAL_DATA_LOAD_COUNT : SUBSEQUENT_DATA_LOAD_COUNT;
    const start =
      page === 0
        ? 0
        : (page - 5) * SUBSEQUENT_DATA_LOAD_COUNT + INITIAL_DATA_LOAD_COUNT;
    const end = start + limit;

    const paginatedProducts = products.content.slice(start, end);
    const isLast = end >= 100;

    return HttpResponse.json({ content: paginatedProducts, last: isLast });
  }),

  http.post(`${CART_ITEMS_ENDPOINT}`, () => {
    return HttpResponse.json({
      productId: 10,
      quantity: 1,
    });
  }),

  http.get(`${CART_ITEMS_COUNT_ENDPOINT}`, () => {
    return HttpResponse.json({
      quantity: 8,
    });
  }),

  http.get(CART_ITEMS_ENDPOINT, () => {
    return HttpResponse.json({
      content: [
        { id: 10, product: { id: 12 } },
        { id: 12, product: { id: 14 } },
      ],
    });
  }),

  http.delete(`${CART_ITEMS_ENDPOINT}/10`, () => {
    return HttpResponse.json(
      {
        itemId: 10,
      },
      { status: 200 },
    );
  }),
];
