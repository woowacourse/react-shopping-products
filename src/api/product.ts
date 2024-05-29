import apiClient from './apiClient';
import { Product } from '../types/Product.type';

export const fetchProducts = async (category: string, page: number, size: number, sort: string): Promise<Product[]> => {
  const queryParameters = new URLSearchParams({
    page: page.toString(),
    size: (page === 0 ? 20 : size).toString(),
    sort: `price,${sort}`,
  });

  if (category && category !== 'all') {
    queryParameters.append('category', category);
  }

  const endpoint = `/products?${queryParameters.toString()}`;

  return apiClient.get({ endpoint }).then((data) => data.content);
};
