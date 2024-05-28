import { HttpResponse, http } from 'msw';
import { ENDPOINTS_ADD_CART, ENDPOINTS_PRODUCTS } from '../api/endpoints';
import products from './products.json';

export const handlers = [
  http.get(`${ENDPOINTS_PRODUCTS}`, () => {
    return HttpResponse.json(products);
  }),
  http.post(`${ENDPOINTS_ADD_CART}`, () => {
    return HttpResponse.json();
  }),
];
