import { ENDPOINT } from './endpoints';
import { ERROR_MESSAGES } from '@/constants/error';
import { fetchWithoutAuth } from './utils/fetchClient';

export interface getProductListProps {
  page?: number;
  size?: number;
  category?: string;
  order?: string;
}

/**
 * 가게 상품 목록 조회
 */
export const getProductList = async ({
  page,
  size,
  category,
  order,
}: getProductListProps) => {
  const response = await fetchWithoutAuth(
    ENDPOINT.product.getList({ page, size, category, order }),
    { method: 'GET' }
  );

  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.getProductList);
  }

  return response.json();
};
