import { CartItemType, ProductsResponseType } from '../types';
import { makeRequest } from './apiRequest';
import { generateBasicToken } from './auth';

const USER_ID = import.meta.env.VITE_USER_ID;
const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;

const basicToken = generateBasicToken(USER_ID, USER_PASSWORD);

interface FetchProductsParams {
  category?: string;
  page?: number;
  size?: number;
  sort?: string;
}

export async function fetchProducts(
  params: FetchProductsParams = {},
): Promise<ProductsResponseType> {
  const queryString = Object.entries(params)
    .map(([key, value]) => {
      if (key === 'category' && value === 'all') {
        return;
      } else {
        return `${key}=${value}`;
      }
    })
    .join('&');
  const response = await makeRequest(`/products?${queryString}`, {
    method: 'GET',
    headers: {
      Authorization: basicToken,
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  return data;
}

export async function addCartItem(productId: number): Promise<void> {
  await makeRequest('/cart-items', {
    method: 'POST',
    headers: {
      Authorization: basicToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId }),
  });
}

export async function fetchCartItem(): Promise<CartItemType[]> {
  const response = await makeRequest('/cart-items?page=0&size=100', {
    method: 'GET',
    headers: {
      Authorization: basicToken,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  return data.content;
}

export async function deleteCartItem(cartItemId: number): Promise<void> {
  await makeRequest(`/cart-items/${cartItemId}`, {
    method: 'DELETE',
    headers: {
      Authorization: basicToken,
      'Content-Type': 'application/json',
    },
  });
}
