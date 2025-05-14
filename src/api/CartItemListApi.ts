import { ResponseProduct } from './types';

async function getCartItemList(): Promise<ResponseProduct[]> {
  const API_URL = import.meta.env.VITE_BASE_URL || '';
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${import.meta.env.VITE_USER_TOKEN}`,
    },
  };
  const response = await fetch(`${API_URL}/cart-items?page=0&size=1073741824&sort=asc`, options);

  const data = await response.json();

  return data.content;
}

export default getCartItemList;
