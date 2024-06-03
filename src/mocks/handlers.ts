import { http, HttpResponse } from 'msw';

import productList from './products.json';

import { END_POINT } from '@/api/endpoints';
import { PRODUCT_DATA_SIZE } from '@/constants/productData';

export const handlers = [
  http.get(END_POINT.products, ({ request }) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get('page')) || 0;
    const limit = Number(url.searchParams.get('size'));
    const start =
      page === 0 ? 0 : (page - 5) * PRODUCT_DATA_SIZE.nextPage + PRODUCT_DATA_SIZE.firstPage;
    const end = start + limit;
    const content = productList.content.slice(start, end);

    const result = {
      ...productList,
      content,
    };

    if (page === 9) {
      result.last = true;
    }

    return HttpResponse.json(result);
  }),
];
