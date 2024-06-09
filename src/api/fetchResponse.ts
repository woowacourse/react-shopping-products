import { generateBasicToken } from '../utils/auth';

interface FetchResponseType {
  url: string;
  method: 'GET' | 'DELETE' | 'POST' | 'PATCH';
  body?: string | null;
}

const USER_ID = import.meta.env.VITE_USER_ID;
const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;
export const token = generateBasicToken(USER_ID, USER_PASSWORD);

const fetchResponse = async ({
  url,
  method = 'GET',
  body = null,
}: FetchResponseType) => {
  const response = await fetch(url, {
    method: method,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body,
  });

  return response;
};

export default fetchResponse;
