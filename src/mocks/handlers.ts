import { http, HttpResponse } from 'msw';
import { PRODUCTS_ENDPOINT } from '../constants/apis';

import {
  ProductsUnfilteredInitial,
  ProductsUnfilteredLast,
  ProductsFilteredBooksInitial,
  ProductsFilteredBooksLast,
  ProductsUnfilteredSortedDescInitial,
  ProductsUnfilteredSortedDescLast,
  ProductsFilteredBooksSortedDescInitial,
  ProductsFilteredBooksSortedDescLast,
} from './products';

export const handlers = [
  http.get(PRODUCTS_ENDPOINT, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || '0');
    const category = url.searchParams.get('category') || 'all';
    const sort = url.searchParams.get('sort') || 'asc';

    if (category === 'all' && sort === 'asc') {
      if (page === 0) return HttpResponse.json(ProductsUnfilteredInitial);
      return HttpResponse.json(ProductsUnfilteredLast);
    }

    if (category === 'all' && sort === 'desc') {
      if (page === 0) return HttpResponse.json(ProductsUnfilteredSortedDescInitial);
      return HttpResponse.json(ProductsUnfilteredSortedDescLast);
    }

    if (category === 'books' && sort === 'asc') {
      if (page === 0) return HttpResponse.json(ProductsFilteredBooksInitial);
      return HttpResponse.json(ProductsFilteredBooksLast);
    }

    if (category === 'books' && sort === 'desc') {
      if (page === 0) return HttpResponse.json(ProductsFilteredBooksSortedDescInitial);
      return HttpResponse.json(ProductsFilteredBooksSortedDescLast);
    }
  }),
];
