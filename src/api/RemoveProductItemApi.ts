import { API_ERROR_MESSAGES, DEFAULT_ERROR_MESSAGE } from './constants/errorMessages';

async function removeProductItemApi(productId: number) {
  const API_URL = import.meta.env.VITE_BASE_URL || '';
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${import.meta.env.VITE_USER_TOKEN}`,
    },
  };
  const response = await fetch(`${API_URL}/cart-items/${productId}`, options);
  if (!response.ok) {
    throw new Error(API_ERROR_MESSAGES[response.status] ?? DEFAULT_ERROR_MESSAGE);
  }
  return response;
}

export default removeProductItemApi;
