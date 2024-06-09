import { CartItemType, ProductsResponseType } from '../types';
import { generateBasicToken } from './auth';

const API_URL = import.meta.env.VITE_API_URL;
const USER_ID = import.meta.env.VITE_USER_ID;
const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;

/**
 * 공통 요청을 처리하는 함수
 * @param {string} endpoint - API endpoint
 * @param {RequestInit} options - fetch options
 * @returns {Response} - fetch response
 */
async function makeRequest(endpoint: string, options: RequestInit): Promise<Response> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: token,
    };
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Failed to ${options.method} ${endpoint}: ${errorData.code} - ${errorData.message}`,
    );
  }

  return response;
}

interface FetchProductsParams {
  category?: string;
  page?: number;
  size?: number;
  sort?: string;
}

/**
 * fetchCartItems - API에서 상품 목록을 fetch합니다.
 * @returns {Promise<ProductType[]>}
 */
export async function fetchProducts(
  params: FetchProductsParams = {},
): Promise<ProductsResponseType> {
  const queryParams = Object.entries(params)
    .filter(([key, value]) => {
      return !(key === 'category' && value === 'all');
    })
    .map(([key, value]) => `${key}=${value}`);

  const queryString = queryParams.length > 0 ? queryParams.join('&') : '';
  const response = await makeRequest(`/products?${queryString}`, {
    method: 'GET',
  });
  const data = await response.json();

  return data;
}

/**
 * addCartItem - 선택한 상품을 장바구니에 추가합니다.
 * @returns {Promise<void>}
 */
export async function addCartItem({ productId }: { productId: number }): Promise<void> {
  await makeRequest('/cart-items', {
    method: 'POST',
    body: JSON.stringify({ productId }),
  });
}

/**
 * fetchCartItem - API에서 장바구니 목록을 fetch합니다.
 * @returns {Promise<CartItemType[]>}
 */
export async function fetchCartItem(page: number, size: number): Promise<CartItemType[]> {
  const response = await makeRequest(`/cart-items?page=${page}&size=${size}`, {
    method: 'GET',
  });

  const data = await response.json();

  return data.content;
}

/**
 * deleteCartItem - 선택한 상품을 장바구니에서 삭제합니다.
 * @returns {Promise<void>}
 */
export async function deleteCartItem(cartItemId: number): Promise<void> {
  await makeRequest(`/cart-items/${cartItemId}`, {
    method: 'DELETE',
  });
}

/**
 * patchCartItemQuantityChange - 선택한 상품을 수량을 변경합니다.
 * @returns {Promise<void>}
 */
export async function patchCartItemQuantityChange({
  cartItemId,
  quantity,
  errorMessage,
}: {
  cartItemId: number;
  quantity: number;
  errorMessage: string;
}): Promise<void> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/cart-items/${cartItemId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    throw new Error(errorMessage);
  }
}
