import { Category, Product, SortOrder } from '@/entities/product';
import { ALL, DEFAULT_CATEGORY, DEFAULT_SORT_ORDER } from '@/features/product';

import { PRODUCTS_ENDPOINT } from './endpoints';

interface fetchProductsParams {
  page?: number;
  size?: number;
  category?: typeof ALL | Category;
  sort?: SortOrder;
}

interface fetchProductsResponse {
  totalPages: number;
  content: Product[];
}

export const fetchProducts = async ({
  page = 1,
  size = 20,
  category = DEFAULT_CATEGORY,
  sort = DEFAULT_SORT_ORDER,
}: fetchProductsParams): Promise<fetchProductsResponse> => {
  let queryString;
  if (category === ALL) {
    queryString = new URLSearchParams({ page: page.toString(), size: size.toString(), sort }).toString();
  } else {
    queryString = new URLSearchParams({ page: page.toString(), size: size.toString(), category, sort }).toString();
  }
  const url = PRODUCTS_ENDPOINT + '?' + queryString;
  console.log(url);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const { totalPages, content } = await response.json();

  return { totalPages, content };
};
