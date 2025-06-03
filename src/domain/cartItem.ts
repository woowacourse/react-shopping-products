import { CartItemType } from '../types/data';

export const getCartId = (cartItems: CartItemType[], productId: number) => {
  const targetItem = cartItems.find((item: CartItemType) => item.product.id === productId);
  if (!targetItem) {
    throw new Error('해당 상품이 장바구니에 없습니다. 장바구니를 확인해주세요.');
  }

  return targetItem?.id;
};

export const extractCartQuantity = (cartItems: CartItemType[], productId: number) => {
  const targetItem = cartItems.find((item: CartItemType) => item.product.id === productId);
  return targetItem ? targetItem.quantity : 0;
};
