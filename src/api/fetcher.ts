interface RequestProps {
  url: string;
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  errorMessage: string;
}

type FetchProps = Omit<RequestProps, 'method'>;

const fetcher = {
  async request({ url, method, errorMessage }: RequestProps) {
    const response = await fetch(url, {
      method,
    });

    if (!response.ok) {
      throw new Error(errorMessage);
    }

    return response;
  },

  get({ url, errorMessage }: FetchProps) {
    return this.request({ url, method: 'GET', errorMessage });
  },
  post({ url, errorMessage }: FetchProps) {
    return this.request({ url, method: 'POST', errorMessage });
  },
  delete({ url, errorMessage }: FetchProps) {
    return this.request({ url, method: 'DELETE', errorMessage });
  },
  patch({ url, errorMessage }: FetchProps) {
    return this.request({ url, method: 'PATCH', errorMessage });
  },
  put({ url, errorMessage }: FetchProps) {
    return this.request({ url, method: 'PUT', errorMessage });
  },
};

export default fetcher;
