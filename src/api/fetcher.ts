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
    const response = await fetch(url, {
      method,
      body: body && JSON.stringify(body),
      headers: headers && headers,
    });

    if (!response.ok) {
      throw new Error(errorMessage);
    }

    return response;
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

export default fetcher;
