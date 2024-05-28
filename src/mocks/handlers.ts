import { http, HttpResponse } from 'msw';
import products from './products.json';
import { BASE_URL } from '@constants/baseUrl';

export const handlers = [
  http.get(`${BASE_URL}/products`, () => {
    // const url = new URL(request.url);

    // const page = Number(url.searchParams.get('page') || '1');
    // const limit = page === 1 ? 20 : 4;
    // const start = page === 1 ? 0 : (page - 2) * 4 + 20;
    // const end = start + limit;

    // const paginatedProducts = products.slice(start, end);

    return HttpResponse.json({ content: products });
  }),
];
