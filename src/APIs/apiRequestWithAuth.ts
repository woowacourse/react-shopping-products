import { CartItem } from '../components/ShoppingCartModal/cart.type';

type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

interface ApiRequestParams<T> {
  endpoint: string;
  method?: HttpMethod;
  body?: T;
}

const username = import.meta.env.VITE_USERNAME;
const password = import.meta.env.VITE_PASSWORD;
const baseUrl = import.meta.env.VITE_BASE_URL;
const credentials = btoa(`${username}:${password}`);

const headers: HeadersInit = {
  'Content-Type': 'application/json',
  Authorization: `Basic ${credentials}`,
};

async function apiRequestWithAuth<TRequest>({
  endpoint,
  method = 'GET',
  body,
}: ApiRequestParams<TRequest>): Promise<CartItem[]> {
  const options: RequestInit = {
    method,
    headers,
  };

  if (body && method !== 'GET') {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${baseUrl}${endpoint}`, options);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('상품을 찾을 수 없습니다.');
    }
    if (response.status === 400) {
      throw new Error('재고 수량을 초과하여 담을 수 없습니다.');
    }
  }

  const contentType = response.headers.get('content-type');
  if (contentType !== 'application/json') return {} as CartItem[];

  const data = await response.json();
  return data.content;
}

export default apiRequestWithAuth;
