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

  return response.json();
};
