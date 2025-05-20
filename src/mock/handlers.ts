import { http } from 'msw';
import mockData from './mockData';

interface CartItemProps {
  id: number;
  quantity: number;
}

export const handlers = [
  http.get('/products', async () => {
    return new Response(JSON.stringify(mockData));
  }),

  http.get('/products/:id', async ({ params }) => {
    const { id } = params;
    const product = mockData.find((product) => product.id === Number(id));
    return new Response(JSON.stringify(product));
  }),

  http.post('/cart-items', async ({ request }) => {
    const newItem = (await request.json()) as CartItemProps;

    const { id, quantity } = newItem;
    const product = mockData.find((product) => product.id === Number(id));

    if (!product) {
      return new Response(
        JSON.stringify({
          errorCode: 'NOT_FOUND',
          message: '상품이 존재하지 않습니다.',
        }),
        { status: 404, headers: { 'Content-Type': 'application/json' } },
      );
    }

    if (product?.quantity > quantity) {
      return new Response(
        JSON.stringify({
          errorCode: 'OUT_OF_STOCK',
          message: '재고 수량을 초과하여 담을 수 없습니다.',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    mockData.push({ ...product, quantity });

    return new Response(null, { status: 201 });
  }),

  http.patch('/cart-items/:id', async ({ params, request }) => {
    const { id } = params;
    const newItem = (await request.json()) as CartItemProps;

    const { quantity } = newItem;
    const product = mockData.find((product) => product.id === Number(id));

    if (!product) {
      return new Response(
        JSON.stringify({ errorCode: 'NOT_FOUND', message: '상품이 존재하지 않습니다.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } },
      );
    }

    if (newItem.quantity > quantity) {
      return new Response(
        JSON.stringify({
          errorCode: 'OUT_OF_STOCK',
          message: '재고 수량을 초과하여 담을 수 없습니다.',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }
  }),
];
