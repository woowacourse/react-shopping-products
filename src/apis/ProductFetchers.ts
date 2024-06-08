import { Category, SortType } from './../pages/ProductPage/Product.types';

import APIClient from './APIClient';
import { PaginationResponse } from '@appTypes/response';
import { Product } from '@appTypes/product';
import { getProductEndpoint } from './getProductEndPoint';

export interface FetchProductsParam {
  page?: number;
  size?: number;
  sortType?: SortType;
  category?: Category;
}

export async function fetchPaginatedProducts(params: FetchProductsParam) {
  const endpoint = getProductEndpoint(params);
  const response = await APIClient.get(endpoint);

  const data = await response.json();

  return data as PaginationResponse<Product[]>;
}
