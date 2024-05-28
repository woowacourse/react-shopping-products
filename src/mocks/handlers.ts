import { http, HttpResponse } from 'msw';

import productList from './products.json';

import { PRODUCTS } from '@/api/endpoints';

export const handlers = [
  http.get(PRODUCTS, ({ request }) => {
    const url = new URL(request.url);

    const page = url.searchParams.get('page') || '0';
    const start = 0;
    const end = 20;
    const result = page === '0' && productList.slice(start, end);

    return HttpResponse.json(result);
  }),
];
