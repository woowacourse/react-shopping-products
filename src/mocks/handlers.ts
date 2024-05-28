import { http, HttpResponse } from 'msw';
import products from './data.json';
import { PRODUCTS_ENDPOINT } from '../api/endpoints';
import {
  INITIAL_DATA_LOAD_COUNT,
  SUBSEQUENT_DATA_LOAD_COUNT,
} from '../constants';

export const handlers = [
  http.get(`${PRODUCTS_ENDPOINT}`, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || '1');
    const limit =
      page === 1 ? INITIAL_DATA_LOAD_COUNT : SUBSEQUENT_DATA_LOAD_COUNT;
    const start =
      page === 1
        ? 0
        : (page - 2) * SUBSEQUENT_DATA_LOAD_COUNT + INITIAL_DATA_LOAD_COUNT;
    const end = start + limit;

    const paginatedProducts = products.content.slice(start, end);
    const isLast = end >= 100;

    return HttpResponse.json({ content: paginatedProducts, last: isLast });
  }),
];
