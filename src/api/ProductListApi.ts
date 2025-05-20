import { API_ERROR_MESSAGES, DEFAULT_ERROR_MESSAGE } from './constants/errorMessages';
import { ResponseProduct } from './types';

async function getProductList({ category, sort }: { category: string; sort: string }): Promise<ResponseProduct[]> {
  const API_URL = import.meta.env.VITE_BASE_URL || '';
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const params: Record<string, string> = {
    sort,
    size: '20',
    page: '0',
  };
  if (category) {
    params.category = category;
  }
  const newParams = new URLSearchParams(params);
  console.log(`${API_URL}/products?${newParams.toString()}`);
  const response = await fetch(`${API_URL}/products?${newParams.toString()}`, options);

  if (!response.ok) {
    throw new Error(API_ERROR_MESSAGES[response.status] ?? DEFAULT_ERROR_MESSAGE);
  }

  const data = await response.json();
  return data.content;
}

export default getProductList;
