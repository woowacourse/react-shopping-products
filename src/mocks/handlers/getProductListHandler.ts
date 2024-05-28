import { HttpResponse, http } from 'msw';

import { ENDPOINT } from '@/api/endpoints';
import productListWith20Items from '@/mocks/data/productList/20Items.json';
import productListWith4Items from '@/mocks/data/productList/4Items.json';

export const getProductListHandler = [
  http.get(ENDPOINT.product.getList({}), ({ request }) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get('page') || '1');

    if (page === 0) return HttpResponse.json(productListWith20Items);
    else return HttpResponse.json(productListWith4Items);
  }),
];
