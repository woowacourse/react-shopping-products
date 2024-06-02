import { ProductResponse } from '../types/fetch';
import { SortingParam } from '../types/sort';
import {
  ENDPOINTS_PRODUCTS,
  ENDPOINTS_CART,
  ENDPOINTS_REMOVE_CART,
} from './endpoints';
import fetchResponse from './fetchResponse';

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

  const response = await fetchResponse({
    url: `${ENDPOINTS_PRODUCTS}?page=${page}&size=${size}${sortingParams}${categoryParam}`,
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(`200~299 이외의 응답이 발생하였습니다.${response.body}`);
  }

  const data = (await response.json()) as ProductResponse;
  return data;
};

export const postAddItems = async (id: number) => {
  const response = await fetchResponse({
    url: `${ENDPOINTS_CART}`,
    method: 'POST',
    body: JSON.stringify({
      productId: id,
      quantity: 1,
    }),
  });

  if (!response.ok) {
    throw new Error(`200~299 이외의 응답이 발생하였습니다.${response.body}`);
  }
};

export const deleteItem = async (id: number) => {
  const response = await fetchResponse({
    url: `${ENDPOINTS_REMOVE_CART(id)}`,
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`200~299 이외의 응답이 발생하였습니다.${response.body}`);
  }
};
