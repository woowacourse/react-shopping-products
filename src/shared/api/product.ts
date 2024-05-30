import { Category, SortOrder } from '@/entities/product';
import { ALL } from '@/features/product';

import { PRODUCTS_ENDPOINT } from './endpoints';

interface fetchProductsParams {
  page?: number;
  size?: number;
  category?: typeof ALL | Category;
  sort?: SortOrder;
}

export async function fetchProducts({
  page = 1,
  size = 20,
  category = 'all',
  sort = 'ascByPrice',
}: fetchProductsParams) {
  let queryString;
  if (category === 'all') {
    queryString = new URLSearchParams({ page: page.toString(), size: size.toString(), sort }).toString();
  } else {
    queryString = new URLSearchParams({ page: page.toString(), size: size.toString(), category, sort }).toString();
  }
  const url = PRODUCTS_ENDPOINT + '?' + queryString;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();
  return data;
}
