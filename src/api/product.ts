import apiClient from './apiClient';
import { Product } from '../types/Product.type';

interface ProductApi {
  data: Product[];
  isLast: boolean;
}

const makeParams = (category: string, page: number, size: number, sort: string): string => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: (page === 0 ? 20 : size).toString(),
    sort: `price,${sort}`,
  });

  if (category && category !== 'all') {
    params.append('category', category);
  }

  return params.toString();
};

export const fetchProducts = async (
  category: string,
  page: number,
  size: number,
  sort: string,
): Promise<ProductApi> => {
  const endpoint = `/products?${makeParams(category, page, size, sort)}`;
  const data = await apiClient.get({ endpoint, errorMessage: '상품 목록을 불러오는 중 에러가 발생했습니다.' });

  return { data: data.content, isLast: data.last };
};
