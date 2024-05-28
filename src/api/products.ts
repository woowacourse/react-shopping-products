import { ProductResponse } from '../types/fetch';
import { SortingParam } from '../types/sort';
import { ENDPOINTS_PRODUCTS } from './endpoints';

export const fetchProducts = async (
  page: number,
  size: number,
  sortings: SortingParam[] = [],
  category: string = '',
): Promise<ProductResponse> => {
  const results = sortings.map(
    (sorting) => `${sorting.name}%2C${sorting.order}`,
  );
  const sortingParams =
    results.length > 0 ? '&sort=' + results.join('&sort=') : '';

  const categoryParam = category ? `&category=${category}` : '';
  console.log(categoryParam);
  const response = await fetch(
    `${ENDPOINTS_PRODUCTS}?page=${page}&size=${size}${sortingParams}${categoryParam}`,
  );

  if (!response.ok) {
    throw new Error(`200~299 이외의 응답이 발생하였습니다.${response.body}`);
  }

  const data = (await response.json()) as ProductResponse;
  return data;
};
