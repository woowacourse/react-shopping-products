import { http, HttpResponse } from 'msw';
import productListData from './productList.json';
import { API_ROUTES } from '@/constants/route';
import { BASE_URL } from '@/constants/baseUrl';
import cartItemListData from './cartItemList.json';

export const handlers = [
  http.get(`${BASE_URL.PRODUCT}${API_ROUTES.PRODUCT_LIST}`, ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '0';
    const size = url.searchParams.get('size') || '20';
    const start = parseInt(page, 10) * parseInt(size, 10);
    const end = start + parseInt(size, 10);

    const response = {
      content: productListData.slice(start, end),
      last: end >= productListData.length,
      number: parseInt(page, 10),
      hasNext: end < productListData.length,
    };

    return HttpResponse.json(response);
  }),

  http.get(`${BASE_URL.PRODUCT}${API_ROUTES.CART_ITEM}`, ({ request }) => {
    const url = new URL(request.url);
    const size = Number(url.searchParams.get('size') || '50');

    const paginatedCartItems = cartItemListData.slice(0, size);

    return HttpResponse.json({
      content: paginatedCartItems,
    });
  }),
];
