import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('http://localhost:5173/products', () => {
    return HttpResponse.json([
      { id: 1, name: '에어포스', price: 35000 },
      { id: 2, name: '슈퍼스타', price: 25000 },
    ]);
  }),
];
