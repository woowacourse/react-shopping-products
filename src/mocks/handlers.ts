import { http, HttpResponse } from 'msw';
import { PRODUCTS_ENDPOINT } from '../api/endpoints';

import products from './products.json';

export const handlers = [
  http.get(PRODUCTS_ENDPOINT, ({ request }) => {
    const url = new URL(request.url);
    const sort = url.searchParams.get('sort');
    const category = url.searchParams.get('category');
    const page = Number(url.searchParams.get('page') || '0');

    const size = page === 0 ? 20 : 4;
    const start = page === 0 ? 0 : (page - 1) * 4 + 20;
    const end = start + size;

    const filterByCategory = category
      ? products.filter((product) => product.category === category)
      : products;

    const sortedProducts = filterByCategory.sort((a, b) =>
      sort === 'asc' ? a.price - b.price : b.price - a.price
    );

    const paginatedProducts = sortedProducts.slice(start, end);
    const last = !products[end + 1];

    return HttpResponse.json({ last, content: [...paginatedProducts] });
  }),
];
