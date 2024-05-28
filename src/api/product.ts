import { ENDPOINT } from './endpoints';

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
  const response = await fetch(
    ENDPOINT.product.getList({ page, size, category, sortOrder })
  );

  if (!response.ok) {
    // TODO: 에러메세지 변경 필요
    throw new Error('Failed to fetch products');
  }

  return response.json();
};
