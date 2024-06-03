import { generateQueryParams } from '../utils/generateQueryParams';
import { HEADERS } from './common';
import { PRODUCTS_ENDPOINT } from './endpoints';
import { CommonQueryParams } from './types';

export const productApis = {
  get: async (params: CommonQueryParams) =>
    await fetch(`${PRODUCTS_ENDPOINT}?${generateQueryParams({ ...params })}`, {
      method: 'GET',
      headers: HEADERS,
    }),
};
