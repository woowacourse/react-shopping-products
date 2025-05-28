import { useContext } from 'react';

import { addCartItem, deleteCartItem, getCartItemList, updateCartItem } from '@/api/cart';
import { ToastContext } from '@/shared/context/ToastProvider';
import { useData } from '@/shared/context/useData';

export const useControlQuantity = (productId: number) => {
  const { cartData } = useData();
  const { showToast } = useContext(ToastContext);

  const cartItem = cartData.data?.find((item) => item.product.id === productId);

  const currentQuantity = cartItem?.quantity || 0;
  const isInCart = !!cartItem;

  const increaseQuantity = async () => {
    try {
      if (!isInCart) {
        await cartData.mutate(
          () => addCartItem({ productId: productId, quantity: 1 }),
          getCartItemList
        );
        return;
      }

      await cartData.mutate(
        () => updateCartItem({ cartId: cartItem.id, newQuantity: currentQuantity + 1 }),
        getCartItemList
      );
    } catch (error) {
      const errorResponse = (error as Error)?.message;
      showToast(
        errorResponse ??
          `"${cartItem?.product.name}" 상품의 최대 구매 수량은 ${cartItem?.product.quantity}개 입니다.`
      );
    }
  };

  const removeCartItem = async () => {
    if (!cartItem) return;
    try {
      await cartData.mutate(() => deleteCartItem(cartItem.id), getCartItemList);
    } catch (error) {
      showToast(`장바구니에서 ${cartItem?.product.name} 상품을 삭제할 수 없습니다.`);
    }
  };

  const decreaseQuantity = async () => {
    try {
      if (!cartItem) {
        showToast('장바구니에 담긴 상품이 없습니다.');
        return;
      }

      if (currentQuantity <= 0) {
        showToast('수량이 올바르지 않습니다.');
        return;
      }

      if (currentQuantity === 1) {
        await removeCartItem();
        return;
      }

      await cartData.mutate(
        () => updateCartItem({ cartId: cartItem.id, newQuantity: currentQuantity - 1 }),
        getCartItemList
      );
    } catch (error) {
      showToast(`장바구니에서 ${cartItem?.product.name} 상품을 삭제할 수 없습니다.`);
    }
  };

  return { isInCart, currentQuantity, increaseQuantity, decreaseQuantity, removeCartItem };
};
