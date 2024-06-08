import { http, HttpResponse } from 'msw';

import cartItems from './cartItems.json';
import productList from './products.json';

import { AddCartItemProp } from '@/api/cart';
import { END_POINT } from '@/api/endpoints';

export const handlers = [
  http.get(END_POINT.products, ({ request }) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get('page')) || 0;
    const limit = page === 0 ? 20 : 4;
    const start = page === 0 ? 0 : (page - 5) * 4 + 20;
    const end = start + limit;
    const content = productList.content.slice(start, end);

    const result = {
      ...productList,
      content,
    };

    if (page === 9) {
      result.last = true;
    }

    return HttpResponse.json(result);
  }),

  http.get(END_POINT.cartItems, () => {
    return HttpResponse.json(cartItems);
  }),

  http.post(
    END_POINT.cartItems,
    async ({ request }: { request: { json: () => Promise<AddCartItemProp> } }) => {
      const { productId } = await request.json();

      const mockCartItem = {
        id: new Date().getTime(),
        quantity: 1,
        product: {
          id: productId,
          name: 'hello',
          price: 10000000,
          imageUrl: '',
          category: 'kitchen',
        },
      };

      const result = {
        ...productList,
        mockCartItem,
      };

      return HttpResponse.json(result);
    },
  ),

  http.patch(`${END_POINT.cartItems}/:id`, ({ params }) => {
    const { id } = params;

    return HttpResponse.json(id, { status: 201 });
  }),
];
