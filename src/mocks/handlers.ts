import { http, HttpResponse } from 'msw';
// import { productList } from './productData';
import productData from './productData.json';

export const handlers = [
  http.get(`${import.meta.env.VITE_API_BASE_URL}/products`, () => {
    return HttpResponse.json(productData);
  }),
];
