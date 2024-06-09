import { SIZE } from '../constants/page';
import { CartResponse } from '../types/fetch';
import { ENDPOINTS_CART } from './endpoints';
import fetchResponse from './fetchResponse';

interface PatchCartItemQuantityProps {
  id: number;
  quantity: number;
}

export const fetchCartItems = async (page: number) => {
  const response = await fetchResponse({
    url: `${ENDPOINTS_CART}?page=${page}&size=${SIZE.CART_ITEMS}`,
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(`200~299 이외의 응답이 발생하였습니다.${response.body}`);
  }

  const data = (await response.json()) as CartResponse;
  return data;
};

/**
 * @param id 카트에 들어간 상품 id (product id X)
 */
export const patchCartItemQuantity = async ({
  id,
  quantity,
}: PatchCartItemQuantityProps) => {
  const response = await fetchResponse({
    url: `${ENDPOINTS_CART}/${id}`,
    method: 'PATCH',
    body: JSON.stringify({
      quantity,
    }),
  });

  if (!response.ok) {
    throw new Error(`200~299 이외의 응답이 발생하였습니다.${response.body}`);
  }
};
