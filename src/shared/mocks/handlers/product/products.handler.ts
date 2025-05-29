import { http, HttpResponse } from 'msw';

import { ENV } from '@/api/env';

import { productsData } from './products.data';

export const productHandlers = [
  http.get(`${ENV.BASE_URL}products`, ({ request }) => {
    const url = new URL(request.url);
    const sort = url.searchParams.get('sort');
    const category = url.searchParams.get('category');

    let productsDataCopy = [...productsData.content];

    if (category && category !== 'ALL' && category !== '') {
      productsDataCopy = productsDataCopy.filter((item) => item.category === category);
    }

    if (sort?.includes('asc')) {
      productsDataCopy.sort((a, b) => a.price - b.price);
    }

    if (sort?.includes('desc')) {
      productsDataCopy.sort((a, b) => b.price - a.price);
    }

    const result = {
      ...productsData,
      content: productsDataCopy,
    };

    return HttpResponse.json(result);
  }),
];
