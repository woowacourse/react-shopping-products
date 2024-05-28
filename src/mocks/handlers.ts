import { HttpResponse, http } from 'msw';
import { ENDPOINTS_ADD_CART, ENDPOINTS_PRODUCTS } from '../api/endpoints';
import productSorter from '../utils/productSorter';
import products from './products.json';

export const handlers = [
  http.get(ENDPOINTS_PRODUCTS, ({ request }) => {
    //http://www.api주소/products?page=1&size=3
    //http://54.180.95.212:8080/products?page=1&size=50&sort=category%2Casc&sort=name%2Cdesc
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page'));
    const size = Number(url.searchParams.get('size'));
    const sortings = url.searchParams.getAll('sort');

    const productCopy = Object.assign({}, products);
    const productSorted = productSorter(sortings, productCopy);

    const start = page * size;
    const end = (page + 1) * size;

    const slicedProducts = products.content.slice(start, end);

    productSorted.content = slicedProducts;
    productSorted.last = productSorted.content.at(-1)!.id === 127;

    return HttpResponse.json(productSorted);
  }),
  http.post(`${ENDPOINTS_ADD_CART}`, () => {
    return HttpResponse.json();
  }),
];
