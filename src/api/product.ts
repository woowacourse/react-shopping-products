import { generateQueryParams } from '../utils/generateQueryParams';
import APIError from './apiError';
import { HEADERS } from './common';
import { PRODUCTS_ENDPOINT } from './endpoints';
import { CommonQueryParams } from './types';

export const productApis = {
  get: async (params: CommonQueryParams) => {
    const response = await fetch(
      `${PRODUCTS_ENDPOINT}?${generateQueryParams({ ...params })}`,
      {
        method: 'GET',
        headers: HEADERS,
      }
    );

    if (!response.ok)
      throw new APIError(response.status, '상품 목록을 불러오지 못했습니다.');

    return await response.json();
  },
};
