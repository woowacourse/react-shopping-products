import { ProductType } from '../types';
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

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to ${options.method?.toLowerCase()} ${endpoint}`);
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
 * fetchCartItems - API에서 상품 목록을 fetch하는 비동기 함수입니다.
 * @returns {Promise<ProductType[]>}
 */
export async function fetchProducts(params: FetchProductsParams = {}): Promise<ProductType[]> {
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  const response = await makeRequest(`/products?${queryString}`, {
    method: 'GET',
  });

  const data = await response.json();

  return data.content;
}
