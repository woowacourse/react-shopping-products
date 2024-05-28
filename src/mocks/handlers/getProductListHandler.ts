import { HttpResponse, http } from 'msw';

import { ENDPOINT } from '@/api/endpoints';
import productListWith20Items from '@/mocks/data/productList/20Items.json';
import productListWith20ItemsDesc from '@/mocks/data/productList/20ItemsDesc.json';
import productListWith4Items from '@/mocks/data/productList/4Items.json';
import productListWith4ItemsDesc from '@/mocks/data/productList/4ItemsDesc.json';

export const getProductListHandler = [
  http.get(ENDPOINT.product.getList({}), ({ request }) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get('page') || '1');
    const sortOrder = url.searchParams.get('sort');

    if (sortOrder === 'price' && page === 0)
      return HttpResponse.json(productListWith20Items);
    else if (sortOrder === 'price,desc' && page === 0)
      return HttpResponse.json(productListWith20ItemsDesc);
    else if (sortOrder === 'price')
      return HttpResponse.json(productListWith4Items);
    else if (sortOrder === 'price,desc')
      return HttpResponse.json(productListWith4ItemsDesc);

    if (sortOrder === 'price') return;
  }),
];
