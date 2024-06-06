import { generateQueryParams } from '../utils/generateQueryParams';
import APIError from './apiError';
import { HEADERS } from './common';
import { CART_ITEMS_ENDPOINT } from './endpoints';
import { CommonQueryParams } from './types';

export const cartApis = {
  get: async (params: CommonQueryParams) => {
    const response = await fetch(
      `${CART_ITEMS_ENDPOINT}?${generateQueryParams({ size: params.size })}`,
      {
        method: 'GET',
        headers: HEADERS,
      }
    );

    if (!response.ok)
      throw new APIError(
        response.status,
        '장바구니 목록을 불러오는 데 실패했습니다.'
      );

    return await response.json();
  },

  add: async (params: CommonQueryParams) => {
    const response = await fetch(`${CART_ITEMS_ENDPOINT}`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        productId: params.productId,
        quantity: 1,
      }),
    });

    if (!response.ok)
      throw new APIError(
        response.status,
        '일시적인 오류로 장바구니에 상품을 추가하지 못했습니다.'
      );

    return await response.json;
  },

  delete: async (params: CommonQueryParams) => {
    const response = await fetch(
      `${CART_ITEMS_ENDPOINT}/${params.cartItemId}`,
      {
        method: 'DELETE',
        headers: HEADERS,
      }
    );

    if (!response.ok)
      throw new APIError(
        response.status,
        '일시적인 오류로 장바구니에서 상품을 삭제하지 못했습니다.'
      );

    return await response.json();
  },
};
