import { Category, SortType } from './../pages/ProductPage/Product.types';

import APIClient from './APIClient';
import { getProductEndpoint } from './getProductEndPoint';

export interface FetchProductsParam {
  page?: number;
  size?: number;
  sortType?: SortType;
  category?: Category;
}

export async function fetchPaginatedProducts(params: FetchProductsParam) {
  const endpoint = getProductEndpoint(params);
  return await APIClient.get(endpoint);
}
