import { CartItemList } from '../types/type';

import { END_POINTS } from './config';
import response from './response';

export async function fetchCartItemList(): Promise<{ content: CartItemList }> {
  const data = await response({
    url: `${END_POINTS.CART_ITEMS}?size=2000&sort=id,desc`,
    method: 'GET',
    errorMessage: '네트워크 문제로 인해 장바구니 목록을 불러오는데 실패했어요.',
  });
  return data;
}

interface AddCartItemProps {
  productId: number;
  quantity: number;
}

export async function addCartItem({
  productId,
  quantity,
}: AddCartItemProps): Promise<void> {
  await response({
    url: `${END_POINTS.CART_ITEMS}`,
    method: 'POST',
    body: JSON.stringify({ productId, quantity }),
    errorMessage: '네트워크 문제로 인해 담기에 실패했어요.',
  });
}

interface DeleteCartItemProps {
  cartItemId: number;
}

export async function deleteCartItem({
  cartItemId,
}: DeleteCartItemProps): Promise<void> {
  await response({
    url: `${END_POINTS.CART_ITEMS}/${cartItemId}`,
    method: 'DELETE',
    errorMessage: '네트워크 문제로 인해 삭제에 실패했어요.',
  });
}

interface PatchCartItemProps {
  cartItemId: number;
  quantity: number;
}

export async function patchCartItem({
  cartItemId,
  quantity,
}: PatchCartItemProps): Promise<void> {
  await response({
    url: `${END_POINTS.CART_ITEMS}/${cartItemId}`,
    method: 'PATCH',
    body: JSON.stringify({ quantity }),
    errorMessage: '네트워크 문제로 인해 수량 조절에 실패했어요.',
  });
}
