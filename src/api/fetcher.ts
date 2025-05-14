type FetcherOptions = {
  baseUrl: string;
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
  post: <T>(url: string, body: T) => Promise<T>;
};

type FetcherResponse<T> = {
  data: T;
  isLoading: boolean;
  error: string | null;
};

export const fetcher: Fetcher = {
  get: async <T>({ baseUrl, query = {} }: FetcherOptions): Promise<T> => {
    const url = new URL(baseUrl);

    Object.entries(query).forEach(([key, value]) => {
      if (value) {
        url.searchParams.append(key, value);
      }
    });

    const response = await fetch(url.toString(), {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`에러 ${response.status}`);
    }

    const data = await response.json();
    return data;
  },

  post: async <T>(url: string, body: T): Promise<T> => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
};
