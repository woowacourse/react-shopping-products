import { ProductResponse } from '../types/fetch';
import { ENDPOINTS_PRODUCTS } from './endpoints';

export const fetchProducts = async (
  page: number,
  size: number,
): Promise<ProductResponse> => {
  const response = await fetch(
    `${ENDPOINTS_PRODUCTS}?page=${page}&size=${size}`,
  );

  if (!response.ok) {
    throw new Error(`200~299 이외의 응답이 발생하였습니다.${response.body}`);
  }

  const data = (await response.json()) as ProductResponse;
  return data;
};
