import { MAX_CART_ITEMS_COUNTS } from '../constants';
import { CategoryType, SortType } from '../type';
import { findCartItemIdByProductId } from '../util/findCartItemIdByProductId';
import {
  CART_ITEMS_COUNT_ENDPOINT,
  CART_ITEMS_ENDPOINT,
  PRODUCTS_ENDPOINT,
} from './endpoints';

const USERNAME = import.meta.env.VITE_USER_ID;
const PASSWORD = import.meta.env.VITE_USER_PASSWORD;
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

export const addCartIㅏtem = async (itemId: number) => {
  const response = await fetch(CART_ITEMS_ENDPOINT, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      productId: itemId,
      quantity: 1,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Items');
  }
};


export const deleteCartItem = async (productId: number) => {
  const cartItemId = await findCartItemIdByProductId(productId);
  if (cartItemId !== undefined) {
    const response = await fetch(`${CART_ITEMS_ENDPOINT}/${cartItemId}`, {
      method: 'DELETE',
      headers: HEADERS,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch Items');
    }
  }
};


export const fetchShoppingCartQuantity = async () => {
  const response = await fetch(CART_ITEMS_COUNT_ENDPOINT, {
    method: 'GET',
    headers: HEADERS,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Items');
  }

  const data = await response.json();
  return data.quantity;
};

export interface Item {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface CartItems {
  id: number;
  quantity: number;
  product: Item;
}

export async function fetchItems(): Promise<CartItems[]> {
  const response = await fetch(
    `${CART_ITEMS_ENDPOINT}?size=${MAX_CART_ITEMS_COUNTS}`,
    {
      method: 'GET',
      headers: HEADERS,
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch Items');
  }
  const data = await response.json();
  return data.content;
}
