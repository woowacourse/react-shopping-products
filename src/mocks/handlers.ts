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
];
