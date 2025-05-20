import { ERROR_MESSAGE } from '../constants/errorMessage';
import { fetchAPI } from './fetchAPI';

interface getProductProps {
  page: number;
  size: number;
  sortBy: string;
}

export const getProduct = async ({ page, size, sortBy }: getProductProps) => {
  const url = `${
    import.meta.env.VITE_API_BASE_URL
  }/products?page=${page}&size=${size}&sort=price,${sortBy}&sort=id,desc`;
  const response = await fetchAPI({ url: url, options: { method: 'GET' } });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || ERROR_MESSAGE.PRODUCT_FETCH_FAIL);
  }

  const data = response.json();
  return data;
};
