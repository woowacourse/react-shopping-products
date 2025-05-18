import { CartItemType } from '../types/data';

export const getCartId = async (cartItems: CartItemType[], productId: number) => {
  const targetItem = cartItems.find((item: CartItemType) => item.product.id === productId);
  if (!targetItem) {
    throw new Error('상품 id를 확인해주세요. 장바구니 아이템 데이터에 존재하지 않습니다.');
  }

  return targetItem && targetItem.id;
};
