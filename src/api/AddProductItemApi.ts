import { API_ERROR_MESSAGES } from './constants/errorMessages';

async function AddProductItemApi(productId: number, quantity: number) {
  const API_URL = import.meta.env.VITE_BASE_URL || '';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${import.meta.env.VITE_USER_TOKEN}`,
    },
    body: JSON.stringify({
      productId,
      quantity,
    }),
  };
  const response = await fetch(`${API_URL}/cart-items`, options);

  if (!response.ok) {
    throw new Error(API_ERROR_MESSAGES[response.status]);
  }
}

export default AddProductItemApi;
