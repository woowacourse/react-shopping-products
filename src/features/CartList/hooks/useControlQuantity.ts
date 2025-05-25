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
    if (cartItem && currentQuantity >= cartItem.product.quantity) {
      showToast('재고가 부족합니다.');
      return;
    }
    try {
      if (!isInCart) {
        await cartData.mutate(
          () => addCartItem({ productId: productId, quantity: 1 }),
          getCartItemList
        );
      }
      if (isInCart) {
        await cartData.mutate(
          () => updateCartItem({ cartId: cartItem!.id, newQuantity: currentQuantity + 1 }),
          getCartItemList
        );
      }
    } catch (error) {
      showToast('장바구니에서 상품를 더할 수 없습니다.');
    }
  };

  const removeCartItem = async () => {
    try {
      if (cartItem) {
        await cartData.mutate(() => deleteCartItem(cartItem.id), getCartItemList);
      }
    } catch (error) {
      showToast('장바구니에서 상품을 삭제할 수 없습니다.');
    }
  };

  const decreaseQuantity = async () => {
    try {
      if (cartItem && currentQuantity !== 1) {
        await cartData.mutate(
          () => updateCartItem({ cartId: cartItem!.id, newQuantity: currentQuantity - 1 }),
          getCartItemList
        );
      }
      if (currentQuantity === 1) {
        await removeCartItem();
      }
    } catch (error) {
      showToast('재고가 부족합니다.');
    }
  };

  return { isInCart, currentQuantity, increaseQuantity, decreaseQuantity, removeCartItem };
};
