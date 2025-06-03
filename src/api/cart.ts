import { CartResponse } from '../types/product';
import { baseUrl } from './config';

const fetchWithAuth = async (
  endpoint: string,
  options: RequestInit = {},
  errorMessage?: string,
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
    const contentType = response.headers.get('Content-Type');
    const isJsonResponse = contentType && contentType.includes('application/json');

    if (isJsonResponse) {
      const errorData = await response.json();
      throw new Error(errorData.message || errorMessage || `API 요청 실패: ${response.status}`);
    } else {
      const errorText = await response.text();
      throw new Error(errorText || errorMessage || `API 요청 실패: ${response.status}`);
    }
  }

  const contentType = response.headers.get('Content-Type');
  const isJsonResponse = contentType && contentType.includes('application/json');

  if (!isJsonResponse) {
    return response;
  }

  return response.json();
};

export const getCartItem = (): Promise<CartResponse> =>
  fetchWithAuth(
    '/cart-items?page=0&size=50&sort=desc',
    { method: 'GET' },
    '장바구니 조회 중 오류가 발생했습니다.',
  );

export const addCart = (id: number) =>
  fetchWithAuth(
    '/cart-items',
    {
      method: 'POST',
      body: JSON.stringify({ productId: id, quantity: 1 }),
    },
    '장바구니 아이템 추가를 실패했습니다.',
  );

export const removeCart = (id: number) =>
  fetchWithAuth(`/cart-items/${id}`, { method: 'DELETE' }, '장바구니 아이템 삭제를 실패했습니다.');

export const updateCartQuantity = (id: number, quantity: number) =>
  fetchWithAuth(
    `/cart-items/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify({ quantity }),
    },
    '장바구니 수량 변경을 실패했습니다.',
  );
