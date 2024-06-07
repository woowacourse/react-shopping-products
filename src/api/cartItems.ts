import { SIZE } from '../constants/page';
import { CartResponse } from '../types/fetch';
import { ENDPOINTS_CART } from './endpoints';
import fetchResponse from './fetchResponse';

export const fetchCartItems = async (page: number) => {
  const response = await fetchResponse({
    url: `${ENDPOINTS_CART}?page=${page}&size=${SIZE.DEFAULT}`,
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(`200~299 이외의 응답이 발생하였습니다.${response.body}`);
  }

  const data = (await response.json()) as CartResponse;
  return data;
};
