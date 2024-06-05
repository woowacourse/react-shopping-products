import { http, HttpResponse } from 'msw';
import products from './products.json';
import { AFTER_FETCH_SIZE, FIRST_FETCH_PAGE, FIRST_FETCH_SIZE } from '../constant/products';

const API_URL = import.meta.env.VITE_API_URL;

export const handlers = [
  http.get(`${API_URL}/products`, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || '0');
    const size = page === FIRST_FETCH_PAGE ? FIRST_FETCH_SIZE : AFTER_FETCH_SIZE;

    const startIndex =
      page === FIRST_FETCH_PAGE ? page : AFTER_FETCH_SIZE * (page - 5) + FIRST_FETCH_SIZE;
    const endIndex = startIndex + size;

    const formattedProducts = products.content.slice(startIndex, endIndex);
    const last = !products.content[endIndex + 1];

    return HttpResponse.json({ last, content: [...formattedProducts] });
  }),
];
