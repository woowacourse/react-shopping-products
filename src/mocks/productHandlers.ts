import { http, HttpResponse } from 'msw';
import products from './data.json';
import {
  INITIAL_DATA_LOAD_COUNT,
  SUBSEQUENT_DATA_LOAD_COUNT,
} from '../constants';
import ENDPOINT from '../api/endpoints';

export const productHandlers = [
  http.get(`${ENDPOINT.PRODUCTS}`, ({ request }) => {
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
    const isLast = end >= 32;
    return HttpResponse.json({ content: paginatedProducts, last: isLast });
  }),
];
