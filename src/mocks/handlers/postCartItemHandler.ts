import { HttpResponse, http } from 'msw';

import { API_URL } from '@/api/config';
import { ENDPOINT } from '@/api/endpoints';

interface postCartInfo {
  productId: string;
  quantity: number;
}

export const postCartItemHandler = [
  http.post(`${API_URL}${ENDPOINT.cartItem.postItem}`, async ({ request }) => {
    const requestBody = (await request.json()) as postCartInfo;

    const { productId, quantity } = requestBody;

    if (productId && quantity) {
      return HttpResponse.json(
        {
          message: 'Item added to cart successfully',
        },
        { status: 201 }
      );
    } else {
      return HttpResponse.json(
        {
          message: `Product not found; productId=${productId}`,
        },
        { status: 404 }
      );
    }
  }),
];
