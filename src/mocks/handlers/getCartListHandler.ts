import { HttpResponse, http } from 'msw';

import { API_URL } from '@/api/config';
import { ENDPOINT } from '@/api/endpoints';
import cartList from '@/mocks/data/cartList/cartList.json';

export const getCartListHandler = [
  http.get(`${API_URL}${ENDPOINT.cartItem.getList}`, () => {
    return HttpResponse.json(cartList);
  }),
];
