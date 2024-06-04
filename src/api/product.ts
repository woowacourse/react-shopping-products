import { Item } from '@/types/index';
import { ENDPOINT } from './endpoints';

import { fetchWithoutAuth } from './utils/fetchClient';
import fetchWithErrorHandling from './utils/fetchWithErrorHandling';

export interface getProductListProps {
  page?: number;
  size?: number;
  category?: string;
  order?: string;
}

interface ProductResponse {
  content: Item[];
  last: boolean;
}

export const getProductList = async ({
  page,
  size,
  category,
  order,
}: getProductListProps): Promise<ProductResponse> => {
  const data = await fetchWithErrorHandling<ProductResponse>(
    () =>
      fetchWithoutAuth(
        ENDPOINT.product.getList({ page, size, category, order }),
        { method: 'GET' },
      ),
    '장바구니에 상품을 추가하는데 실패했습니다.',
  );

  return data;
};
