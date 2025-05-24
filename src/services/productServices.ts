import { MockProductsType } from '../mocks/dummy';
import apiClient from './apiClient';

interface ProductsResponse {
  content: MockProductsType[];
}

export const getProducts = async (categoryOption: string = '전체', sortOption: string = 'asc') => {
  const categoryUrl = categoryOption === '전체' ? '' : `&category=${categoryOption}`;
  const fullUrl = `/products?page=0&size=20&sort=price,${sortOption}` + categoryUrl;
  const data = await apiClient<ProductsResponse>({
    method: 'GET',
    URI: fullUrl,
  });

  return data.content;
};
