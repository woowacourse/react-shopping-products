import { ProductsResponseData } from '../types/product';
import { PRODUCTS_ENDPOINT } from './endpoints';

export async function fetchProducts(
  page: number,
  size: number,
  category = '',
): Promise<ProductsResponseData> {
  const params = new URLSearchParams();
  if (category !== '') params.append('category', category);

  params.append('page', String(page));
  params.append('size', String(size));

  const response = await fetch(`${PRODUCTS_ENDPOINT}?${params.toString()}`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();
  return data;
}
