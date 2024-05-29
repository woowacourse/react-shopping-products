import { FIRST_PAGE, FIRST_PAGE_SIZE, SIZE_PER_PAGE } from '../constants/pagination';
import { ProductsResponseData, Sort } from '../types/product';
import { PRODUCTS_ENDPOINT } from './endpoints';

export async function fetchProducts(
  page: number,
  category = '',
  sort: Sort,
): Promise<ProductsResponseData> {
  const size = page === FIRST_PAGE ? FIRST_PAGE_SIZE : SIZE_PER_PAGE;
  const params = new URLSearchParams();

  if (category !== '') params.append('category', category);
  params.append('page', String(page));
  params.append('size', String(size));

  Object.entries(sort).forEach(([condition, order]) =>
    params.append('sort', `${condition},${order}`),
  );

  const response = await fetch(`${PRODUCTS_ENDPOINT}?${params.toString()}`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();
  return data;
}
