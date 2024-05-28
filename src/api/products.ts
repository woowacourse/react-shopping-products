import { ProductsResponseData } from '../types/product';
import { PRODUCTS_ENDPOINT } from './endpoints';

export async function fetchProducts(page: number, size: number): Promise<ProductsResponseData> {
  const response = await fetch(`${PRODUCTS_ENDPOINT}?page=${page}&size=${size}`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();

  return data;
}
