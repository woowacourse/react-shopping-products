import { http, HttpResponse } from 'msw';
import products from '../products.json';
import {
  INITIAL_PAGE_NUMBER,
  INITIAL_PAGE_SIZE,
  PAGE_SIZE,
} from '../../../src/constants/paginationRules';
import { PRODUCTS_ENDPOINT } from '../../../src/api/endpoints';

export const productsHandlers = [
  http.get(PRODUCTS_ENDPOINT, ({ request }) => {
    const url = new URL(request.url);
    const sort = url.searchParams.get('sort');
    const category = url.searchParams.get('category');
    const page = Number(url.searchParams.get('page') || '0');

    const size = page === INITIAL_PAGE_NUMBER ? INITIAL_PAGE_SIZE : PAGE_SIZE;
    const start =
      page === INITIAL_PAGE_NUMBER
        ? page
        : (page - 5) * PAGE_SIZE + INITIAL_PAGE_SIZE;
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
