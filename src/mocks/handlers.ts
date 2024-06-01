import { http, HttpResponse } from 'msw';
import productListData from './productList.json';
import { API_ROUTES } from '@/constants/route';
import { BASE_URL } from '@/constants/baseUrl';
import cartItemListData from './cartItemList.json';

export const handlers = [
  http.get(`${BASE_URL.PRODUCT}${API_ROUTES.PRODUCT_LIST}?page=0&size=20`, ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '0';
    const size = url.searchParams.get('size') || '20';
    const start = parseInt(page, 10) * parseInt(size, 10);
    const end = start + parseInt(size, 10);

    return HttpResponse.json({
      content: productListData.slice(start, end),
    });
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
