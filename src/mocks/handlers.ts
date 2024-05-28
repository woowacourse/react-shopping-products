import { HttpResponse, http } from 'msw';
import { ENDPOINTS_ADD_CART, ENDPOINTS_PRODUCTS } from '../api/endpoints';
import products from './products.json';

export const handlers = [
  http.get(ENDPOINTS_PRODUCTS, ({ request }) => {
    //http://www.api주소/products?page=1&size=3
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page'));
    const size = Number(url.searchParams.get('size'));

    const start = (page - 1) * size;
    const end = page * size;

    const slicedProducts = products.content.slice(start, end);
    products.content = slicedProducts;
    return HttpResponse.json(products);
  }),
  http.post(`${ENDPOINTS_ADD_CART}`, () => {
    return HttpResponse.json();
  }),
];
