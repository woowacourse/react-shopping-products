import apiClient from './apiClient';
import { Product } from '../types/Product.type';

export const fetchProducts = async (page: number = 0, size: number = 20): Promise<Product[]> => {
  return apiClient.get({ endpoint: `/products?page=${page}&size=${size}` }).then((data) => data.content);
};
