import { http, HttpResponse } from 'msw';
// import { productList } from './productData';
import productData from './productData.json';
import CartData from './cartData.json';
import { ProductElement } from '../types/type';

export const handlers = [
  http.get(`${import.meta.env.VITE_API_BASE_URL}/products`, ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '0');
    const size = parseInt(url.searchParams.get('size') || '10');
    const sortParams = url.searchParams.getAll('sort'); // 여러 sort 가능

    let content = [...productData.content];

    for (const sortParam of sortParams.reverse()) {
      const [field, direction] = sortParam.split(',') as [
        keyof ProductElement,
        'asc' | 'desc'
      ];

      content.sort((a, b) => {
        if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
        if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    const start = page * size;
    const paged = content.slice(start, start + size);

    return HttpResponse.json({
      content: paged,
      totalElements: content.length,
      totalPages: Math.ceil(content.length / size),
      number: page,
      size,
    });
  }),

  http.get(`${import.meta.env.VITE_API_BASE_URL}/cart-items`, () => {
    return HttpResponse.json(CartData);
  }),
];
