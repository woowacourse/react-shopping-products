import { CategoryType } from '../constants';
import { PRODUCTS_ENDPOINT } from './endpoints';

const USERNAME = import.meta.env.VITE_USERNAME;
const PASSWORD = import.meta.env.VITE_PASSWORD;
function generateBasicToken(userId: string, userPassword: string): string {
  const token = btoa(`${userId}:${userPassword}`);
  return `Basic ${token}`;
}

const HEADERS = {
  Authorization: generateBasicToken(USERNAME, PASSWORD),
  'Content-Type': 'application/json',
};

export async function fetchProducts(
  page: number,
  limit: number,
  category: CategoryType,
) {
  const categoryQuery = category === 'all' ? '' : `category=${category}`;

  const response = await fetch(
    `${PRODUCTS_ENDPOINT}?${categoryQuery}&page=${page}&size=${limit}`,

    {
      method: 'GET',
      headers: HEADERS,
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();
  return data;
}
