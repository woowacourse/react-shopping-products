import { http, HttpResponse } from 'msw';
import products from './products.json';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const handlers = [
  http.get(`${BASE_URL}/products`, ({ request }) => {
    const url = new URL(request.url);
    const sortParam = url.searchParams.get('sort');

    const sorted = [...products];

    if (sortParam) {
      const [key, direction] = sortParam.split(',');

      sorted.sort((a, b) => {
        const isAsc = direction === 'asc';
        if (key === 'price') {
          return isAsc ? a.price - b.price : b.price - a.price;
        }
        if (key === 'name') {
          return isAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        }
        return 0;
      });
    }

    return HttpResponse.json({ content: sorted });
  }),
];
