import {http, HttpResponse} from 'msw';
import {products} from './mockData';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const handlers = [
  http.get(BASE_URL + '/products', ({request}) => {
    const url = new URL(request.url);
    const sort = url.searchParams.get('sort');

    if (sort === 'price,desc')
      return HttpResponse.json({
        content: [...products.content].sort((a, b) => b.price - a.price),
      });

    if (sort === 'price,asc')
      return HttpResponse.json({
        content: [...products.content].sort((a, b) => a.price - b.price),
      });

    return HttpResponse.json(products);
  }),
];
