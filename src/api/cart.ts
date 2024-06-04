import { generateQueryParams } from '../utils/generateQueryParams';
import { HEADERS } from './common';
import { CART_ITEMS_ENDPOINT } from './endpoints';
import { CommonQueryParams } from './types';

export const cartApis = {
  get: async (params: CommonQueryParams) =>
    await fetch(
      `${CART_ITEMS_ENDPOINT}?${generateQueryParams({ size: params.size })}`,
      {
        method: 'GET',
        headers: HEADERS,
      }
    ),

  add: async (params: CommonQueryParams) =>
    await fetch(`${CART_ITEMS_ENDPOINT}`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        productId: params.productId,
        quantity: 1,
      }),
    }),

  delete: async (params: CommonQueryParams) =>
    await fetch(`${CART_ITEMS_ENDPOINT}/${params.cartItemId}`, {
      method: 'DELETE',
      headers: HEADERS,
    }),
};
