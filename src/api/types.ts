export type FetcherResponse<T> = Promise<T>;

export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export type MethodConfig = {
  includeQuery: boolean;
  includeBody: boolean;
  returnOriginalOnNoContent: boolean;
};

export type RequestOptions<T> = {
  baseUrl: string;
  token: string;
  method: string;
  query?: object;
  body?: T;
  returnOriginalOnNoContent?: boolean;
};
