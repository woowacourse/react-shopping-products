import { baseUrl } from './config';

interface getProductProps {
  page: number;
  size: number;
  sortBy: string;
}

export const getProduct = async ({ page, size, sortBy }: getProductProps) => {
  const response = await fetch(
    `${baseUrl}/products?page=${page}&size=${size}&sort=price,${sortBy}&sort=id,desc`
  );
  const data = await response.json();

  return data;
};
