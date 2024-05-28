import { http, HttpResponse } from 'msw';

import { PRODUCTS } from '@/api/endpoints';

export const handlers = [
  http.get(PRODUCTS, () => {
    return HttpResponse.json();
  }),
];
