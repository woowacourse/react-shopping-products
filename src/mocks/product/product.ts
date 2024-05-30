import { http, HttpResponse } from 'msw';
import products from './products.json';
import { API_URL } from '../../constants/api';

export const handlers = [
  http.get(`${API_URL}/products`, ({ request }) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get('page') || '1');
    const limit = page === 0 ? 20 : 4;
    const start = page === 0 ? 0 : (page - 1) * 4 + 20;
    const end = start + limit;

    const paginatedProducts = products.slice(start, end);

    return HttpResponse.json({ content: paginatedProducts });
  }),
];
