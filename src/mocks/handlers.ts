import { HttpResponse, http } from 'msw';

import productsData from './products.json';

import { CART_ITEMS_ENDPOINT, PRODUCTS_ENDPOINT } from '../api/endpoints';
import * as PRODUCTS from '../constants/pagination';
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
    const products = productsData as Product[];
    const url = new URL(request.url);

    const page = Number(url.searchParams.get('page') || '0');
    const category = (url.searchParams.get('category') || 'all') as Category;
    const sort = url.searchParams.get('sort');
    const [, order] = sort ? sort.split(',') : ['price', 'asc'];
    const size = page === PRODUCTS.FIRST_PAGE ? PRODUCTS.FIRST_PAGE_SIZE : PRODUCTS.SIZE_PER_PAGE;

    const start =
      page === PRODUCTS.FIRST_PAGE
        ? PRODUCTS.FIRST_PAGE
        : (page - PRODUCTS.GAP_WITH_FIRST_PAGE) * PRODUCTS.SIZE_PER_PAGE + PRODUCTS.FIRST_PAGE_SIZE;
    const end = start + size;
    const last = page === PRODUCTS.MOCK_LAST_PAGE;

    const filteredProducts =
      category !== 'all' ? products.filter((product) => product.category === category) : products;

    const sortedProducts = orderByPrice(filteredProducts, order as Order);

    const paginatedProducts = sortedProducts.slice(start, end);

    return HttpResponse.json({ content: paginatedProducts, last });
  }),

  http.post(CART_ITEMS_ENDPOINT, async () => {
    return HttpResponse.json(null, { status: 201 });
  }),

  http.delete(`${CART_ITEMS_ENDPOINT}/:id`, async () => {
    return new HttpResponse(null, { status: 204 });
  }),
];
