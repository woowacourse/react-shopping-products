import { QueryParams } from '@appTypes/queryParams';

export const generateQueryParams = <T extends QueryParams>(queryParams: T) => {
  const params = new URLSearchParams();

  for (const key in queryParams) {
    if (queryParams[key] !== null) {
      params.append(key, (queryParams[key] ?? '').toString());
    }
  }

  return params;
};
