import { HttpResponse, http } from 'msw';

import products from './products.json';
import electronics from './electronics.json';
import beverages from './beverages.json';
import fashions from './fashions.json';
import books from './books.json';
import fitness from './fitness.json';
import kitchens from './kitchens.json';

import { PRODUCTS_ENDPOINT } from '../api/endpoints';
import {
  FIRST_PAGE,
  FIRST_PAGE_SIZE,
  GAP_WITH_FIRST_PAGE,
  MOCK_PRODUCTS_LAST_PAGE,
  SIZE_PER_PAGE,
} from '../constants/pagination';
import { Category } from '../types/product';

const filterByCategory = (category: Category) => {
  switch (category) {
    case 'electronics':
      return electronics;
    case 'beverage':
      return beverages;
    case 'fashion':
      return fashions;
    case 'books':
      return books;
    case 'fitness':
      return fitness;
    case 'kitchen':
      return kitchens;

    default:
      return products;
  }
};

export const handlers = [
  http.get(PRODUCTS_ENDPOINT, ({ request }) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get('page') || '0');
    const category = (url.searchParams.get('category') || '') as Category;
    const size = page === FIRST_PAGE ? FIRST_PAGE_SIZE : SIZE_PER_PAGE;

    const start =
      page === FIRST_PAGE
        ? FIRST_PAGE
        : (page - GAP_WITH_FIRST_PAGE) * SIZE_PER_PAGE + FIRST_PAGE_SIZE;
    const end = start + size;
    const last = page === MOCK_PRODUCTS_LAST_PAGE;

    const filteredProducts = filterByCategory(category);

    const paginatedProducts = filteredProducts.slice(start, end);

    return HttpResponse.json({ content: paginatedProducts, last });
  }),
];
