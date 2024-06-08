import { http, HttpResponse } from 'msw';
import { products, cartItems } from './data/index';
import { ENDPOINT } from '../api/endpoints';
import { API_URL } from '@/api/config';
import {
  INITIAL_DATA_LOAD_COUNT,
  SUBSEQUENT_DATA_LOAD_COUNT,
  INITIAL_PAGE,
} from '@/constants/index';

export const handlers = [
  http.get(`${API_URL}${ENDPOINT.product.getList({})}`, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || '0');
    const limit =
      page === INITIAL_PAGE
        ? INITIAL_DATA_LOAD_COUNT
        : SUBSEQUENT_DATA_LOAD_COUNT;
    const start =
      page === INITIAL_PAGE
        ? 0
        : (page - INITIAL_DATA_LOAD_COUNT / SUBSEQUENT_DATA_LOAD_COUNT) *
            SUBSEQUENT_DATA_LOAD_COUNT +
          INITIAL_DATA_LOAD_COUNT;
    const end = start + limit;

    const paginatedProducts = products.content.slice(start, end);
    const isLast = end >= products.totalElements;

    return HttpResponse.json({ content: paginatedProducts, last: isLast });
  }),

  http.post(`${API_URL}${ENDPOINT.cartItem.postItem}`, () => {
    return HttpResponse.json({
      productId: 10,
      quantity: 1,
    });
  }),

  http.get(`${API_URL}${ENDPOINT.cartItem.getItemCount}`, () => {
    const totalQuantity = cartItems.content.reduce(
      (acc, item) => acc + item.quantity,
      0,
    );
    return HttpResponse.json({
      quantity: totalQuantity,
    });
  }),

  http.get(`${API_URL}${ENDPOINT.cartItem.getList}`, () => {
    return HttpResponse.json(cartItems);
  }),

  http.delete(`${API_URL}${ENDPOINT.cartItem.deleteItem(100)}`, async () => {
    return HttpResponse.json('success');
  }),
];
