import { HttpResponse, http } from 'msw';
import APIClient from '@apis/APIClient';

import products from './mockData';
import { getPage, getQueryByURL, getSortingFunc } from '@mocks/handlers/products/product.util';

export const productsHandler = http.get(`${APIClient.API_URL}/products`, ({ request }) => {
  const url = new URL(request.url);

  const { page, size, category, sortStandard, sortOrder } = getQueryByURL(url);
  const sortingFunc = getSortingFunc(sortStandard, sortOrder);

  const filteredProduct = products.filter(
    (product) => category === '' || category === product.category
  );

  filteredProduct.sort(sortingFunc);

  const { paginatedPage, last } = getPage(filteredProduct, size, page);

  return HttpResponse.json({ content: paginatedPage, last });
});
