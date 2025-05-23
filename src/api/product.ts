import { ProductListResponse } from '../types/response';
import { apiRequest } from './apiRequest';

export const productApi = {
  getProductList: async ({
    sortType,
    category,
  }: {
    sortType: string;
    category: string;
  }) => {
    const query = `/products?page=0&size=20${
      category === '전체' ? '' : `&category=${category}`
    }${sortType === '높은 가격순' ? '&sort=price,desc' : '&sort=price,asc'}`;

    return apiRequest<ProductListResponse>(query, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.content);
  },
};
