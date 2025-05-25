import { http } from 'msw';

export const handlers = [
  http.get('/api/test', () => {
    return new Response(JSON.stringify({ message: 'MSW is working!' }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
];
