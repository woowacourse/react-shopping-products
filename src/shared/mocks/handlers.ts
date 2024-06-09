import { http, HttpResponse } from 'msw';

import { ALL, DEFAULT_SORT_ORDER, Product, SORT_ORDERS, SortOrder } from '@/shared';

import { API_CONFIG } from '../config/api';

import products from './products.json';

const sortByPrice = (products: Product[], sort: SortOrder) => {
  if (sort === SORT_ORDERS[0]) {
    return products.sort((a, b) => a.price - b.price);
  } else if (sort === SORT_ORDERS[1]) {
    return products.sort((a, b) => b.price - a.price);
  } else {
    throw new Error("Order must be 'asc' or 'desc'");
  }
};

export const handlers = [
  http.get(API_CONFIG.domain + '/products', ({ request }) => {
    const url = new URL(request.url);

    const category = url.searchParams.get('category') || ALL;
    const page = Number(url.searchParams.get('page') || '0');
    const sort = (url.searchParams.get('sort') || DEFAULT_SORT_ORDER) as SortOrder;

    const size = page === 0 ? 20 : 4;
    const start = page === 0 ? 0 : (page - 2) * 4 + 20;
    const end = start + size;
    let paginatedProducts;
    if (category === ALL) {
      paginatedProducts = products.slice(start, end);
    } else {
      paginatedProducts = products.filter((product) => product.category === category).slice(start, end);
    }

    paginatedProducts = sortByPrice(paginatedProducts as Product[], sort);

    return HttpResponse.json(paginatedProducts);
  }),
];
