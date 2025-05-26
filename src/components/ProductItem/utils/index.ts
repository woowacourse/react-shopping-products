import { ResponseCartItem } from '../../../api/types';
import { CartItemState } from '../types';

export const isItemInCart = (productId: number, cartItemList: ResponseCartItem[]): CartItemState => {
  const isInCart = cartItemList.some((item) => item.product.id === productId);
  const quantity = cartItemList.find((item) => item.product.id === productId)?.quantity || 0;
  if (isInCart) {
    return { quantity, isInCart: true, text: '삭제', keyword: 'remove' };
  }

  return { isInCart: false, text: '담기', keyword: 'add' };
};

export const getCartItemId = (productId: number, cartItemList: ResponseCartItem[]) => {
  const cartItem = cartItemList.find((item) => item.product.id === productId);

  return cartItem?.id;
};
