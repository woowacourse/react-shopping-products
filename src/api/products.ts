import { ProductResponse } from '../types/fetch';
import { SortingParam } from '../types/sort';
import { ApiClient } from './ApiClient';
import { ENDPOINTS_PRODUCTS } from './endpoints';

const apiClient = new ApiClient({
  'Content-Type': 'application/json',
});

export const fetchProducts = async (
  page: number,
  size: number,
  sortings: SortingParam[] = [],
  category: string = '',
) => {
  const results = sortings.map(
    (sorting) => `${sorting.name}%2C${sorting.order}`,
  );
  const sortingParams =
    results.length > 0 ? '&sort=' + results.join('&sort=') : '';
  const categoryParam = category ? `&category=${category}` : '';

  const url = `${ENDPOINTS_PRODUCTS}?page=${page}&size=${size}${sortingParams}${categoryParam}`;

  return await apiClient.get<ProductResponse>(url);
};
