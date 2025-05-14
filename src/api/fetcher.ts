type FetcherOptions = {
  baseUrl: string;
  token: string;
  query?: object;
};

type Fetcher = {
  /**
   *
   * @param url - The URL to send the request to.
   * @param query - An array of query parameters to append to the URL.
   * @returns
   */
  get: <T>(options: FetcherOptions) => Promise<T>;
  /**
   * @param url - The URL to send the request to.
   * @param data - The data to send in the request body.
   * @returns A promise that resolves to the response data.
   */
  post: <T>(baseUrl: string, token: string, body: T) => Promise<T>;
};

type FetcherResponse<T> = {
  data: T;
  isLoading: boolean;
  error: string | null;
};

export const fetcher: Fetcher = {
  get: async <T>({ baseUrl, token, query = {} }: FetcherOptions): Promise<T> => {
    const url = new URL(baseUrl);

    Object.entries(query).forEach(([key, value]) => {
      if (String(value)) {
        url.searchParams.append(key, value.toString());
      }
    });

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + token,
      },
    });

    if (!response.ok) {
      throw new Error(`${response.status}, ${response.statusText}`);
    }

    return await response.json();
  },

  post: async <T>(baseUrl: string, token: string, body: T): Promise<T> => {
    const url = new URL(baseUrl);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + token,
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return body;
    }

    return await response.json();
  },
};
