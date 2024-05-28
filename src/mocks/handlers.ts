import { HttpResponse, http } from 'msw';
import products from './products.json';
import { PRODUCTS_ENDPOINT } from '../api/endpoints';
import {
  FIRST_PAGE,
  FIRST_PAGE_SIZE,
  GAP_WITH_FIRST_PAGE,
  MOCK_PRODUCTS_LAST_PAGE,
  SIZE_PER_PAGE,
} from '../constants/pagination';

export const handlers = [
  http.get(PRODUCTS_ENDPOINT, ({ request }) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get('page') || '0');
    const size = page === FIRST_PAGE ? FIRST_PAGE_SIZE : SIZE_PER_PAGE;
    const start =
      page === FIRST_PAGE
        ? FIRST_PAGE
        : (page - GAP_WITH_FIRST_PAGE) * SIZE_PER_PAGE + FIRST_PAGE_SIZE;
    const end = start + size;
    const last = page === MOCK_PRODUCTS_LAST_PAGE;

    const paginatedProducts = products.slice(start, end);

    return HttpResponse.json({ content: paginatedProducts, last });
  }),
];
