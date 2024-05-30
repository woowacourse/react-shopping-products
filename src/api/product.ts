import { ENDPOINT } from './endpoints';
import { fetchWithoutAuth } from './utils/fetchClient';

export interface getProductListProps {
  page?: number;
  size?: number;
  category?: string;
  order?: string;
}

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
    throw new Error('상품 정보 불러오기를 실패했습니다. 다시 시도해 주세요.');
  }

  return response.json();
};
