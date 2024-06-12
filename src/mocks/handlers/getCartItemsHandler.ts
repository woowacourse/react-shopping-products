import { HttpResponse, http } from 'msw';

import { API_URL } from '@/api/config';
import ENDPOINT from '@/api/endpoints';

import cartItems from '@/mocks/data/cartItems/defaultCartItems.json';

export const getCartItemsHandler = [
  http.get(`${API_URL}${ENDPOINT.cartItem.getList}`, async () => {
    return HttpResponse.json(cartItems);
  }),
];
