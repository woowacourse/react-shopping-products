import CustomError from '@/utils/error';

interface RequestProps {
  url: string;
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  errorMessage: string;
  body?: Record<string, string | number>;
  headers?: Record<string, string>;
}

type FetchProps = Omit<RequestProps, 'method'>;

const fetcher = {
  async request({ url, method, errorMessage, body, headers }: RequestProps) {
    try {
      const response = await fetch(url, {
        method,
        body: body && JSON.stringify(body),
        headers: headers && headers,
      });

      handleErrorStatus(response.status, errorMessage);

      return response;
    } catch (error) {
      if (!(error instanceof CustomError)) {
        throw new CustomError({ name: 'NETWORK_ERROR', message: errorMessage });
      }

      throw error;
    }
  },

  get({ url, headers, errorMessage }: FetchProps) {
    return this.request({ url, method: 'GET', headers, errorMessage });
  },
  post({ url, body, headers, errorMessage }: FetchProps) {
    return this.request({ url, method: 'POST', body, headers, errorMessage });
  },
  delete({ url, headers, errorMessage }: FetchProps) {
    return this.request({ url, method: 'DELETE', headers, errorMessage });
  },
  patch({ url, headers, errorMessage }: FetchProps) {
    return this.request({ url, method: 'PATCH', headers, errorMessage });
  },
  put({ url, headers, errorMessage }: FetchProps) {
    return this.request({ url, method: 'PUT', headers, errorMessage });
  },
};

const handleErrorStatus = (status: number, errorMessage: string) => {
  switch (status) {
    case 400:
      throw new CustomError({ name: 'BAD_REQUEST_ERROR', message: errorMessage });
    case 401:
      throw new CustomError({ name: 'AUTHORIZED_ERROR', message: errorMessage });
    case 404:
      throw new CustomError({ name: 'NOT_FOUND_ERROR', message: errorMessage });
    case 500:
      throw new CustomError({ name: 'SERVER_ERROR', message: errorMessage });
  }
};

export default fetcher;
