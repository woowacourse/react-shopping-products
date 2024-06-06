import { token } from './config';

export type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PATCH';

interface ResponseProps {
  url: string;
  method: HttpMethod;
  body?: BodyInit;
}

const response = async ({ url, method, body }: ResponseProps) => {
  const result = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body,
  });
  if (method !== 'GET') return;
  return result.json();
};

export default response;
