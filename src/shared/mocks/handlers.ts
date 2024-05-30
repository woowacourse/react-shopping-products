import { http, HttpResponse } from 'msw';

import { Product, SortOrder } from '@/entities/product';

import products from './products.json';

const sortByPrice = (products: Product[], sort: SortOrder) => {
  if (sort === 'ascByPrice') {
    return products.sort((a, b) => a.price - b.price);
  } else if (sort === 'descByPrice') {
    return products.sort((a, b) => b.price - a.price);
  } else {
    throw new Error("Order must be 'asc' or 'desc'");
  }
};

export const handlers = [
  http.get(PRODUCTS_ENDPOINT, ({ request }) => {
    const url = new URL(request.url);

    const category = url.searchParams.get('category') || 'all';
    const page = Number(url.searchParams.get('page') || '1');
    const sort = (url.searchParams.get('sort') || 'ascByPrice') as SortOrder;

    const size = page === 1 ? 20 : 4;
    const start = page === 1 ? 0 : (page - 2) * 4 + 20;
    const end = start + size;
    let paginatedProducts;
    if (category === 'all') {
      paginatedProducts = products.slice(start, end);
    } else {
      paginatedProducts = products.filter((product) => product.category === category).slice(start, end);
    }

    paginatedProducts = sortByPrice(paginatedProducts, sort);

    return HttpResponse.json(paginatedProducts);
  }),
];
