import { http, HttpResponse } from 'msw';
import productData from './productData.json';
import cartData from './cartData.json';
import { ProductElement } from '../types/type';
import { ERROR_MESSAGE } from '../constants/errorMessage';

export const handlers = [
  http.get(`${import.meta.env.VITE_API_BASE_URL}/products`, ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '0');
    const size = parseInt(url.searchParams.get('size') || '10');
    const sortParams = url.searchParams.getAll('sort'); // 여러 sort 가능

    let content = [...productData.content];

    for (const sortParam of sortParams.reverse()) {
      const [field, direction] = sortParam.split(',') as [
        keyof ProductElement,
        'asc' | 'desc'
      ];

      content.sort((a, b) => {
        if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
        if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    const start = page * size;
    const paged = content.slice(start, start + size);

    return HttpResponse.json({
      content: paged,
      totalElements: content.length,
      totalPages: Math.ceil(content.length / size),
      number: page,
      size,
    });
  }),

  http.get(`${import.meta.env.VITE_API_BASE_URL}/cart-items`, () => {
    return HttpResponse.json(cartData);
  }),

  http.post(
    `${import.meta.env.VITE_API_BASE_URL}/cart-items`,
    async ({ request }) => {
      const body = (await request.json()) as {
        productId: number;
        quantity: number;
      };
      const { productId, quantity } = body;

      const product = productData.content.find((p) => p.id === productId);
      if (!product) {
        return;
      }

      if (cartData.content.length >= 50) {
        return HttpResponse.json(
          {
            message: ERROR_MESSAGE.MAX_CART_ITEM,
          },
          { status: 400 }
        );
      }

      const newCartItem = {
        id: Math.max(...cartData.content.map((c) => c.id), 0) + 1,
        product: product,
        quantity,
      };

      cartData.content.push(newCartItem);

      return HttpResponse.json(newCartItem, { status: 201 });
    }
  ),

  http.patch(
    `${import.meta.env.VITE_API_BASE_URL}/cart-items/:id`,
    async ({ request, params }) => {
      const id = Number(params.id);
      const body = (await request.json()) as { quantity: number };
      const quantity = body.quantity;

      const cartItem = cartData.content.find((item) => item.id === id);
      if (!cartItem) {
        return;
      }

      const product = productData.content.find(
        (p) => p.id === cartItem.product.id
      );
      if (!product) {
        return;
      }
      if (quantity > product.quantity) {
        return HttpResponse.json(
          {
            message: ERROR_MESSAGE.PRODUCT_MAX_QUANTITY,
          },
          { status: 400 }
        );
      }

      cartItem.quantity = quantity;

      return HttpResponse.json(cartItem, { status: 200 });
    }
  ),

  http.delete(
    `${import.meta.env.VITE_API_BASE_URL}/cart-items/:id`,
    ({ params }) => {
      const id = Number(params.id);

      const index = cartData.content.findIndex((item) => item.id === id);

      cartData.content.splice(index, 1);

      return HttpResponse.json(cartData, { status: 200 });
    }
  ),
];
