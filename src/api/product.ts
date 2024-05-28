import { ENDPOINT } from './endpoints';

export interface getProductListProps {
  page?: number;
  size?: number;
  category?: string;
  sort?: string;
}

export const getProductList = async ({
  page,
  size,
  category,
  sort,
}: getProductListProps) => {
  const response = await fetch(
    ENDPOINT.product.getList({ page, size, category, sort })
  );

  if (!response.ok) {
    // TODO: 에러메세지 변경 필요
    throw new Error('Failed to fetch products');
  }

  return response.json();
};
