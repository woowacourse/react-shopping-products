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

  APIClient.validateResponse(response, '상품 목록을 불러오는데 실패했습니다.');

  const data = await response.json();

  return data as PaginationResponse<Product[]>;
}
