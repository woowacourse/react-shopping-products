import { ERROR_MESSAGE, ERROR_NAME } from '@/constants/error';
import CustomError from '@/utils/error';
import { isErrorStatus } from '@/utils/typeGuard';

interface RequestProps {
  url: string;
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  body?: Record<string, string | number>;
  headers?: Record<string, string>;
}

type FetchProps = Omit<RequestProps, 'method'>;

const fetcher = {
  async request({ url, method, body, headers }: RequestProps) {
    try {
      const response = await fetch(url, {
        method,
        body: body && JSON.stringify(body),
        headers: headers && headers,
      });

      if (isErrorStatus(response.status)) {
        const errorName = ERROR_NAME[response.status];
        throw new CustomError({ name: errorName, message: ERROR_MESSAGE[errorName] });
      }

      return response;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw new CustomError({ name: 'NETWORK_ERROR', message: ERROR_MESSAGE['NETWORK_ERROR'] });
    }
  },

  get({ url, headers }: FetchProps) {
    return this.request({ url, method: 'GET', headers });
  },
  post({ url, body, headers }: FetchProps) {
    return this.request({ url, method: 'POST', body, headers });
  },
  delete({ url, headers }: FetchProps) {
    return this.request({ url, method: 'DELETE', headers });
  },
  patch({ url, headers }: FetchProps) {
    return this.request({ url, method: 'PATCH', headers });
  },
  put({ url, headers }: FetchProps) {
    return this.request({ url, method: 'PUT', headers });
  },
};

export default fetcher;
