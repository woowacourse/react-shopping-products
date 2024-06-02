import { HttpResponse, http } from 'msw';

import { API_URL } from '@/api/config';

export const deleteCartItemHandler = [
  http.delete(`${API_URL}/cart-items/:id`, async ({ params }) => {
    const { id } = params;

    if (id) {
      return HttpResponse.json(
        {
          message: 'Item removed from cart successfully',
        },
        { status: 200 }
      );
    } else {
      return HttpResponse.json(
        {
          message: `Item not found; id=${id}`,
        },
        { status: 404 }
      );
    }
  }),
];
