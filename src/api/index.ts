import { CategoryType, SortType } from '../constants';
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
  sorting: SortType,
) {
  const categoryQuery = category === 'all' ? '' : `category=${category}`;
  const sortingQuery =
    sorting === 'priceAsc' ? `sort=price%2Casc` : `sort=price%2Cdesc`;

  const response = await fetch(
    `${PRODUCTS_ENDPOINT}?${categoryQuery}&page=${page}&size=${limit}&${sortingQuery}`,

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
export const fetchShoppingCartQuantity = async () => {
  const response = await fetch(CART_ITEMS_COUNT_ENDPOINT, {
    method: 'GET',
    headers: HEADERS,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Items');
  }

  const data = await response.json();
  console.log(data);
  return data.quantity;
};
