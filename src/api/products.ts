import { SortType } from '../components/hooks/useProducts';
import { generateQueryParams } from '../utils/generateQueryParams';
import { HEADERS } from './common';
import { PRODUCTS_ENDPOINT } from './endpoints';

interface ProductQueryParams {
  page: number;
  size: number;
  sort: SortType;
  category?: string;
}

export async function fetchProducts({
  page,
  size,
  sort,
  category,
}: ProductQueryParams) {
  const params = generateQueryParams({
    page,
    size,
    sort: `price,${sort}`,
    category,
  });
  const response = await fetch(`${PRODUCTS_ENDPOINT}?${params}`, {
    method: 'GET',
    headers: HEADERS,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();
  return data;
}
