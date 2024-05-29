import { ID, PASSWORD } from '@src/constants/system';

import { generateBasicToken } from './auth';

interface FetchWithTokenParameter {
  url: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: BodyInit;
}

export async function fetchWithToken<T>({ url, method, body }: FetchWithTokenParameter): Promise<T> {
  const token = generateBasicToken(ID, PASSWORD);
  const response = await fetch(url, {
    method,
    body,
    headers: {
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = (await response.json()) as T;
  return data;
}
