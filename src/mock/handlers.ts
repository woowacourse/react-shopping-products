import { http, HttpResponse } from 'msw';
import fullProductList from './products.json';
import { ProductTypes } from '../types/ProductTypes';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const handlers = [
  http.get(`${baseUrl}/products`, async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || '0');
    const size = Number(url.searchParams.get('size') || '20');
    const sort = url.searchParams.get('sort') || '';
    const category = url.searchParams.get('category') || '';

    let filtered = [...fullProductList.content];

    if (category) {
      filtered = filtered.filter((p) => p.category === category);
    }

    const allowedSortKeys: (keyof ProductTypes)[] = ['price', 'id'];

    if (sort) {
      const [key, direction] = sort.split(',') as [
        keyof ProductTypes,
        'asc' | 'desc'
      ];

      if (allowedSortKeys.includes(key)) {
        filtered.sort((a, b) =>
          direction === 'desc'
            ? b[key]! > a[key]!
              ? 1
              : -1
            : a[key]! > b[key]!
            ? 1
            : -1
        );
      }
    }

    return HttpResponse.json({
      ...fullProductList,
      content: filtered,
      totalElements: filtered.length,
      totalPages: Math.ceil(filtered.length / size),
      number: page,
      size,
      numberOfElements: filtered.length,
      empty: filtered.length === 0,
      first: page === 0,
      last: (page + 1) * size >= filtered.length,
    });
  }),
];
