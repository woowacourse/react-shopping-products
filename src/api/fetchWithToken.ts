import { generateBasicToken } from './auth';
import { USER_ID, USER_PASSWORD } from './userInformation';

const token = generateBasicToken(USER_ID, USER_PASSWORD);

interface FetchOption {
  headers?: HeadersInit;
}

interface PostFetchOption extends FetchOption {
  body?: object;
}

export const FetchWithToken = {
  get: async <T>(url: string, { headers }: FetchOption = {}): Promise<T> => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: token,
        ...headers,
      },
    });

    if (response.status === 500) {
      throw new Error(
        '서버에 문제가 발생했습니다. 관리자에게 문의하시거나 잠시 후 다시 시도해주세요.',
      );
    }

    if (!response.ok) throw new Error('Failed to request "GET"');

    const data: T = await response.json();

    return data;
  },

  post: async (url: string, { headers, body }: PostFetchOption = {}) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: token,
        ...headers,
      },
      body: JSON.stringify({ ...body }),
    });

    if (response.status === 500) {
      throw new Error(
        '서버에 문제가 발생했습니다. 관리자에게 문의하시거나 잠시 후 다시 시도해주세요.',
      );
    }

    if (!response.ok) throw new Error('Failed to request "POST"');
  },

  delete: async (url: string, { headers }: FetchOption = {}) => {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: token,
        ...headers,
      },
    });

    if (response.status === 500) {
      throw new Error(
        '서버에 문제가 발생했습니다. 관리자에게 문의하시거나 잠시 후 다시 시도해주세요.',
      );
    }

    if (!response.ok) throw new Error('Failed to request "DELETE"');
  },
};
