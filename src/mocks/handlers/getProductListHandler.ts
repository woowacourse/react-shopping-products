import { HttpResponse, http } from 'msw';
import { API_URL } from '@/api/config';
import ENDPOINT from '@/api/endpoints';

import fashionProductListWith4Items from '@/mocks/data/productList/category/4ItemsFashion.json';
import fashionProductListWith20Items from '@/mocks/data/productList/category/20ItemsFashion.json';

import fitnessProductListWith4Items from '@/mocks/data/productList/category/4ItemsFitness.json';
import fitnessProductListWith20Items from '@/mocks/data/productList/category/20ItemsFitness.json';

import productListWith4Items from '@/mocks/data/productList/default/4Items.json';
import productListWith20Items from '@/mocks/data/productList/default/20Items.json';

import productListWith4ItemsDesc from '@/mocks/data/productList/sort/4ItemsDesc.json';
import productListWith20ItemsDesc from '@/mocks/data/productList/sort/20ItemsDesc.json';

export const getProductListHandler = [
  http.get(`${API_URL}${ENDPOINT.product.getList({})}`, ({ request }) => {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    const page = Number(searchParams.get('page'));
    const sort = searchParams.getAll('sort');
    const category = searchParams.get('category');

    const getResponseJson = () => {
      switch (category) {
        case 'fashion':
          return page === 0
            ? fashionProductListWith20Items
            : fashionProductListWith4Items;
        case 'fitness':
          return page === 0
            ? fitnessProductListWith20Items
            : fitnessProductListWith4Items;
        default:
          if (sort.includes('price,desc')) {
            return page === 0
              ? productListWith20ItemsDesc
              : productListWith4ItemsDesc;
          }
          return page === 0 ? productListWith20Items : productListWith4Items;
      }
    };

    const responseJson = getResponseJson();
    return HttpResponse.json(responseJson);
  }),
];
