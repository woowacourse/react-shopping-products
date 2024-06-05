import API_ROUTES from '../constant/apiRoutes';
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
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (key === 'category' && value === 'all') {
      return;
    }
    if (value !== undefined) {
      queryParams.append(key, String(value));
    }
  });

  const response = await makeRequest(`${API_ROUTES.products}?${queryParams.toString()}`, {
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
  await makeRequest(`${API_ROUTES.cartItems}`, {
    method: 'POST',
    headers: {
      Authorization: basicToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId }),
  });
}

export async function fetchCartItem(): Promise<CartItemType[]> {
  const queryParams = new URLSearchParams({ page: '0', size: '100' });

  const response = await makeRequest(`${API_ROUTES.cartItems}?${queryParams.toString()}`, {
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
  await makeRequest(`${API_ROUTES.cartItems}/${cartItemId}`, {
    method: 'DELETE',
    headers: {
      Authorization: basicToken,
      'Content-Type': 'application/json',
    },
  });
}
