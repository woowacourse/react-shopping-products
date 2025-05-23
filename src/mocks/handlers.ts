import { http, HttpResponse } from 'msw';
import products from './data/mock-products.json';

const baseURL = import.meta.env.VITE_BASE_URL;

export const handlers = [
  http.get(`${baseURL}/products`, ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const sort = url.searchParams.get('sort'); // e.g., "price,desc"

    // 1. 필터링
    let filtered = products;
    if (category) {
      filtered = filtered.filter((item) => item.category === category);
    }

    // 2. 정렬
    if (sort) {
      const [, direction] = sort.split(',');
      filtered = filtered.sort((a, b) => {
        const delta = a.price - b.price;
        return direction === 'desc' ? -delta : delta;
      });
    }

    const totalElements = filtered.length;
    const totalPages = Math.ceil(filtered.length / 20);

    return HttpResponse.json({
      content: filtered,
      pageable: {
        pageNumber: 0,
        pageSize: 20,
        sort: {
          empty: false,
          sorted: true,
          unsorted: false,
        },
        offset: 0,
        paged: true,
        unpaged: false,
      },
      last: totalElements <= 20,
      totalElements,
      totalPages,
      size: 20,
      number: 0,
      sort: {
        empty: false,
        sorted: true,
        unsorted: false,
      },
      first: true,
      numberOfElements: 20,
      empty: false,
    });
  }),
];
