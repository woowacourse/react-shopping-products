import { PRODUCTS } from './endpoints';
import fetcher from './fetcher';

import { ProductResponse } from '@/types/product';

export const fetchProductList = async (page: number, size: number): Promise<ProductResponse> => {
  const response = await fetcher.get({
    url: `${PRODUCTS}?page=${page}&size=${size}`,
    errorMessage: '상품 리스트 불러오기에 실패했습니다.🥹',
  });

  const data = await response.json();

  return data;
};
