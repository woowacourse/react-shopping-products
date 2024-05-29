import { HttpResponse, http } from 'msw';
import { ENDPOINTS_ADD_CART, ENDPOINTS_PRODUCTS } from '../api/endpoints';
import { ProductResponse } from '../types/fetch';
import productSorter from '../utils/productSorter';
import products from './products.json';

const filterProductHandler = (
  productCopy: ProductResponse,
  category: string | null,
) => {
  return category
    ? productCopy.content.filter((product) => product.category === category)
    : productCopy.content;
};

const sortProductHandler = (
  sortings: string[],
  productCopy: ProductResponse,
) => {
  return sortings.length > 0
    ? productSorter(sortings, productCopy)
    : productCopy;
};

export const handlers = [
  http.get(ENDPOINTS_PRODUCTS, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page'));
    const size = Number(url.searchParams.get('size'));
    const sortings = url.searchParams.getAll('sort');
    const category = url.searchParams.get('category');

    const productCopy = Object.assign({}, products);
    productCopy.content = filterProductHandler(productCopy, category);

    const productSorted = sortProductHandler(sortings, productCopy);

    const start = page * size;
    const end = (page + 1) * size;
    const productSliced = Object.assign({}, productSorted);
    productSliced.content = productSorted.content.slice(start, end);
    productSliced.last = productSliced.content.at(-1)!.id === 127;

    return HttpResponse.json(productSliced);
  }),
  http.post(`${ENDPOINTS_ADD_CART}`, () => {
    return HttpResponse.json();
  }),
];
