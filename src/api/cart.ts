import { CartResponse } from '../types/product';
import { baseUrl } from './config';

const fetchWithAuth = async (
  endpoint: string,
  options: RequestInit = {},
  errorMessage?: string
) => {
  const url = `${baseUrl}${endpoint}`;

  const defaultHeaders = {
    Authorization: `Basic ${import.meta.env.VITE_API_TOKEN}`,
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || errorMessage || `API 요청 실패: ${response.status}`);
  }

  return response;
};

export const getCartItem = async (): Promise<CartResponse> => {
  const response = await fetchWithAuth(
    '/cart-items?page=0&size=50&sort=desc',
    { method: 'GET' },
    '장바구니 조회 중 오류가 발생했습니다.'
  );

  return response.json();
};

export const addCart = async (id: number) => {
  const response = await fetchWithAuth(
    '/cart-items',
    {
      method: 'POST',
      body: JSON.stringify({ productId: id, quantity: 1 }),
    },
    '장바구니 아이템 추가를 실패했습니다.'
  );

  return response.json();
};

export const removeCart = async (id: number) => {
  const response = await fetchWithAuth(
    `/cart-items/${id}`,
    { method: 'DELETE' },
    '장바구니 아이템 삭제를 실패했습니다.'
  );

  return response.json();
};
