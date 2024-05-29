import { ENDPOINT } from './endpoints';
import { fetchWithoutAuth } from './utils/fetchClient';

export interface getProductListProps {
  page?: number;
  size?: number;
  category?: string;
  sortOrder?: string;
}

export const getProductList = async ({
  page,
  size,
  category,
  sortOrder,
}: getProductListProps) => {
  const response = await fetchWithoutAuth(
    ENDPOINT.product.getList({ page, size, category, sortOrder }),
    { method: 'GET' }
  );

  return response.json();
};
