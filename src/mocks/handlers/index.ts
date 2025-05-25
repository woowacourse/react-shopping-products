import { http } from 'msw';
import { productsHandlers } from './productsHandlers';
import { cartHandlers } from './cartHandlers';

export const handlers = [
  http.get('/api/test', () => {
    return new Response(JSON.stringify({ message: 'MSW is working!' }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),

  ...productsHandlers,
  ...cartHandlers,
];
