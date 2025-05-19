import { ResponseCartItem } from '../../../api/types';
import { CartItemState } from '../types';

export const isItemInCart = (productId: number, cartItemList: ResponseCartItem[]): CartItemState => {
  const isInCart = cartItemList.some((item) => item.product.id === productId);

  if (isInCart) {
    return { isInCart: true, text: '삭제', keyword: 'remove' };
  }

  return { isInCart: false, text: '담기', keyword: 'add' };
};

export const getCartItemId = (productId: number, cartItemList: ResponseCartItem[]) => {
  const cartItem = cartItemList.find((item) => item.product.id === productId);

  return cartItem?.id;
};
