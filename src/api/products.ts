import { SortType } from '../components/hooks/useProducts';
import { HEADERS } from './common';
import { PRODUCTS_ENDPOINT } from './endpoints';

interface ProductArgs {
  page?: number;
  size?: number;
  sort?: SortType;
  category?: string;
}

export async function fetchProducts({
  page,
  size,
  sort,
  category,
}: ProductArgs) {
  // URLSearchParams로 리팩토링?
  const response = await fetch(
    `${PRODUCTS_ENDPOINT}?page=${page}&size=${size}&sort=price,${sort}${
      category !== '' ? `&category=${category}` : ''
    }`,
    {
      method: 'GET',
      headers: HEADERS,
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();
  return data;
}
