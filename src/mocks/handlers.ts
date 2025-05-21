import { http, HttpResponse } from 'msw';
import { CART_URL, PRODUCT_URL } from '../constants/endpoint';
import filterProductList from '../utils/filterProductList';
import sortProductList from '../utils/sortProductList';
import { filterType, SortingType } from '../types';
import productsMockData from './data/productsMockData';
import cartMockData from './data/cartMockData';

export const handlers = [
  http.get(PRODUCT_URL, ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category') as filterType;
    const sort = url.searchParams.get('sort');

    let resultProducts = productsMockData.content;
    if (category) resultProducts = filterProductList(resultProducts, category);
    if (sort) resultProducts = sortProductList(resultProducts, sort.split(',')[1] as SortingType);

    return HttpResponse.json({ content: resultProducts });
  }),

  http.get(CART_URL, () => {
    return HttpResponse.json(cartMockData);
  }),

  http.post(CART_URL, async ({ request }) => {
    const body = await request.json();
    const { productId, quantity } = body as { productId: number; quantity: number };

    if (!productId || quantity < 1) {
      return HttpResponse.error();
    }

    return HttpResponse.json({ ok: true }, { status: 201 });
  }),

  http.delete(`${CART_URL}/:id`, async () => {
    return HttpResponse.json({ ok: true }, { status: 201 });
  }),
];
