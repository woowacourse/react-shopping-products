import { CommonQueryParams } from '../api/types';

export const generateQueryParams = <T extends CommonQueryParams>(
  queryParams: T
) => {
  const urlSearchParams = new URLSearchParams();

  Object.entries(queryParams).forEach(([param, value]) => {
    if (!value) return;

    if (Array.isArray(value)) {
      return value.forEach((v) => urlSearchParams.append(param, v));
    }

    urlSearchParams.append(param, value.toString());
  });

  return urlSearchParams;
};
