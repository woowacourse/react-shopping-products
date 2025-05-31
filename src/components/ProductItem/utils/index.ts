import { ResponseCartItem } from '../../../api/types';
import { CartItemState } from '../types';

export const getCartItemState = (productId: number, cartItemList: ResponseCartItem[]): CartItemState => {
  const cartItem = cartItemList.find((item) => item.product.id === productId);
  const isItemInCart = Boolean(cartItem);

  return {
    quantity: cartItem?.quantity ?? 0,
    isItemInCart,
    text: isItemInCart ? '삭제' : '담기',
    keyword: isItemInCart ? 'remove' : 'add',
  };
};

export const getCartItemId = (productId: number, cartItemList: ResponseCartItem[]) => {
  const cartItem = cartItemList.find((item) => item.product.id === productId);

  return cartItem?.id;
};
