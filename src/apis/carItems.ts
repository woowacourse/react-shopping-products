import { CartItemList } from '../types/type';
import { END_POINTS } from './config';
import response from './response';

export async function fetchCartItemList(): Promise<{ content: CartItemList }> {
  const data = await response({
    url: `${END_POINTS.CART_ITEMS}?size=2000`,
    method: 'GET',
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
    method: 'DELETE',
    body: JSON.stringify({ quantity }),
  });
}
