import { http } from 'msw';
import { mockData, mockCartData } from './mockData';

interface CartItemProps {
  productId: number;
  quantity: number;
}

const getRequestURL = (url: string) => {
  return `${import.meta.env.VITE_API_BASE_URL}${url}`;
};

export const handlers = [
  http.get(getRequestURL('/products'), async () => {
    return new Response(JSON.stringify({ content: [...mockData] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }),

  http.get(getRequestURL('/products/:id'), async ({ params }) => {
    const { id } = params;
    const product = mockData.find((product) => product.id === Number(id));
    return new Response(JSON.stringify({ content: product }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }),

  http.get(getRequestURL('/cart-items'), async () => {
    return new Response(JSON.stringify({ content: [...mockCartData] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }),

  http.post(getRequestURL('/cart-items'), async ({ request }) => {
    const newItem = (await request.json()) as CartItemProps;

    const { productId, quantity } = newItem;
    const product = mockData.find((data) => data.id === Number(productId));

    if (!product) {
      return new Response(
        JSON.stringify({
          errorCode: 'NOT_FOUND',
          message: '상품이 존재하지 않습니다.',
        }),
        { status: 404, headers: { 'Content-Type': 'application/json' } },
      );
    }

    if (product?.quantity < quantity) {
      return new Response(
        JSON.stringify({
          errorCode: 'OUT_OF_STOCK',
          message: '재고 수량을 초과하여 담을 수 없습니다.',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    mockCartData.push({
      id: mockCartData.length + 1,
      product: product,
      quantity: quantity,
    });

    return new Response(JSON.stringify({ content: null }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  }),

  http.patch(getRequestURL('/cart-items/:id'), async ({ params, request }) => {
    const { id } = params;

    const updateItem = (await request.json()) as CartItemProps;
    const { quantity } = updateItem;

    const cartIndex = mockCartData.findIndex((cartItem) => cartItem.product.id === Number(id));
    const productIndex = mockData.findIndex((product) => product.id === Number(id));

    if (cartIndex === -1) {
      return new Response(
        JSON.stringify({ errorCode: 'NOT_FOUND', message: '상품이 존재하지 않습니다.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } },
      );
    }

    if (updateItem.quantity > mockData[productIndex].quantity) {
      return new Response(
        JSON.stringify({
          errorCode: 'OUT_OF_STOCK',
          message: '재고 수량을 초과하여 담을 수 없습니다.',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    mockCartData[cartIndex].quantity = quantity;

    return new Response(null, {
      status: 204,
      headers: { 'Content-Type': 'application/json' },
    });
  }),

  http.delete(getRequestURL('/cart-items/:id'), async ({ params }) => {
    const { id } = params;
    const cartIndex = mockCartData.findIndex((cartItem) => cartItem.id === Number(id));

    if (cartIndex === -1) {
      return new Response(
        JSON.stringify({ errorCode: 'NOT_FOUND', message: '상품이 존재하지 않습니다.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } },
      );
    }

    mockCartData.splice(cartIndex, 1);

    return new Response(null, {
      status: 204,
      headers: { 'Content-Type': 'application/json' },
    });
  }),
];
