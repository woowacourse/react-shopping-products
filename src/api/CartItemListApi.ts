import { API_ERROR_MESSAGES, DEFAULT_ERROR_MESSAGE } from './constants/errorMessages';
import { ResponseCartItem } from './types';

async function getCartItemList(): Promise<ResponseCartItem[]> {
  const API_URL = import.meta.env.VITE_BASE_URL || '';
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${import.meta.env.VITE_USER_TOKEN}`,
    },
  };
  const params = {
    size: '20',
    page: '0',
  };
  const newParams = new URLSearchParams(params);
  const response = await fetch(`${API_URL}/cart-items?${newParams.toString()}`, options);

  if (!response.ok) {
    throw new Error(API_ERROR_MESSAGES[response.status] ?? DEFAULT_ERROR_MESSAGE);
  }

  const data = await response.json();

  return data.content;
}

export default getCartItemList;
