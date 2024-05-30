import { HttpResponse, http } from 'msw';

import { API_URL } from '@/api/config';
import { ENDPOINT } from '@/api/endpoints';
import fashionProductListWith20Items from '@/mocks/data//productList/category/20ItemsFashion.json';
import fashionProductListWith4Items from '@/mocks/data/productList/category/4ItemsFashion.json';
import fitnessProductListWith20Items from '@/mocks/data/productList/category/20ItemsFitness.json';
import fitnessProductListWith4Items from '@/mocks/data/productList/category/4ItemsFitness.json';
import productListWith20Items from '@/mocks/data/productList/default/20Items.json';
import productListWith20ItemsDesc from '@/mocks/data/productList/sort/20ItemsDesc.json';
import productListWith4Items from '@/mocks/data/productList/default/4Items.json';
import productListWith4ItemsDesc from '@/mocks/data/productList/sort/4ItemsDesc.json';

export const getProductListHandler = [
  http.get(`${API_URL}${ENDPOINT.product.getList({})}`, ({ request }) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get('page'));
    const sortOrder = url.searchParams.get('sort');
    const category = url.searchParams.get('category');

    switch (category) {
      case 'fashion':
        if (page === 0) return HttpResponse.json(fashionProductListWith20Items);
        else HttpResponse.json(fashionProductListWith4Items);

        break;
      case 'fitness':
        if (page === 0) return HttpResponse.json(fitnessProductListWith20Items);
        else HttpResponse.json(fitnessProductListWith4Items);
        break;
    }

    if (sortOrder === 'price,desc') {
      if (page === 0) return HttpResponse.json(productListWith20ItemsDesc);
      else return HttpResponse.json(productListWith4ItemsDesc);
    }

    if (page === 0) return HttpResponse.json(productListWith20Items);
    else return HttpResponse.json(productListWith4Items);
  }),
];
