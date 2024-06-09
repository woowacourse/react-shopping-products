import { token } from './config';

export type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PATCH';

interface ResponseProps {
  url: string;
  method: HttpMethod;
  body?: BodyInit;
  errorMessage: string;
}

const response = async ({ url, method, body, errorMessage }: ResponseProps) => {
  const result = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body,
  });
  if (!result.ok) throw new Error(errorMessage);
  if (method !== 'GET') return;
  return result.json();
};

export default response;
