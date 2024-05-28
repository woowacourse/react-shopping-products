import { API_URL } from './endpoints';

interface Params {
  [key: string]: string | number | undefined;
}

export const buildURL = (path: string, params: Params = {}) => {
  const url = new URL(`${API_URL}${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.append(key, String(value));
    }
  });

  console.log('url ', url.toString());
  return url.toString();
};
