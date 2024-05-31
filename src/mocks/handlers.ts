import { HttpResponse, http } from 'msw';

import products from './products.json';
import { PRODUCTS_ENDPOINT } from '../api/endpoints';
import {
  FIRST_PAGE,
  FIRST_PAGE_SIZE,
  GAP_WITH_FIRST_PAGE,
  MOCK_PRODUCTS_LAST_PAGE,
  SIZE_PER_PAGE,
} from '../constants/pagination';
import { Category, Order, Product } from '../types/product';

const orderByPrice = (products: Product[], order: Order) => {
  if (order === 'asc') {
    return [...products].sort((prevProduct, nextProduct) => prevProduct.price - nextProduct.price);
  } else {
    return [...products].sort((prevProduct, nextProduct) => nextProduct.price - prevProduct.price);
  }
};

export const handlers = [
  http.get(PRODUCTS_ENDPOINT, ({ request }) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get('page') || '0');
    const category = (url.searchParams.get('category') || 'all') as Category;
    const sort = url.searchParams.get('sort');
    const [, order] = sort ? sort.split(',') : ['price', 'asc'];
    const size = page === FIRST_PAGE ? FIRST_PAGE_SIZE : SIZE_PER_PAGE;

    const start =
      page === FIRST_PAGE
        ? FIRST_PAGE
        : (page - GAP_WITH_FIRST_PAGE) * SIZE_PER_PAGE + FIRST_PAGE_SIZE;
    const end = start + size;
    const last = page === MOCK_PRODUCTS_LAST_PAGE;

    const filteredProducts =
      category !== 'all' ? products.filter((product) => product.category === category) : products;

    const sortedProducts = orderByPrice(filteredProducts, order as Order);

    const paginatedProducts = sortedProducts.slice(start, end);

    return HttpResponse.json({ content: paginatedProducts, last });
  }),
];
