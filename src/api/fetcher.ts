import { request } from './request';
import { FetcherResponse, HttpMethod, MethodConfig, RequestOptions } from './types';

const methodConfigs: Record<HttpMethod, MethodConfig> = {
  GET: {
    includeQuery: true,
    includeBody: false,
    returnOriginalOnNoContent: false,
  },
  POST: {
    includeQuery: false,
    includeBody: true,
    returnOriginalOnNoContent: true,
  },
  PATCH: {
    includeQuery: false,
    includeBody: true,
    returnOriginalOnNoContent: true,
  },
  DELETE: {
    includeQuery: false,
    includeBody: false,
    returnOriginalOnNoContent: true,
  },
} as const;

const createFetchMethod = (method: keyof typeof methodConfigs) => {
  return async <T>(options: RequestOptions<T>): FetcherResponse<T> => {
    const config = methodConfigs[method];
    const requestOptions: RequestOptions<T> = {
      baseUrl: options.baseUrl,
      token: options.token,
      method,
    };
    if (config.includeQuery && options.query) {
      requestOptions.query = options.query;
    }
    if (config.includeBody && options.body) {
      requestOptions.body = options.body;
    }
    if (config.returnOriginalOnNoContent) {
      requestOptions.returnOriginalOnNoContent = true;
    }
    return await request<T>(requestOptions);
  };
};

export const fetcher = {
  get: createFetchMethod('GET'),
  post: createFetchMethod('POST'),
  patch: createFetchMethod('PATCH'),
  delete: createFetchMethod('DELETE'),
};
