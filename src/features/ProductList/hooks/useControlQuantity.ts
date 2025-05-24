import { useContext } from 'react';

import { addCartItem, deleteCartItem, getCartItemList, updateCartItem } from '@/api/cart';
import { ToastContext } from '@/shared/context/ToastProvider';
import { useData } from '@/shared/context/useData';

export const useControlQuantity = (id: number) => {
  const { cartData } = useData();
  const { showToast } = useContext(ToastContext);

  const cartItem = cartData.data?.find((item) => item.product.id === id);
  const cartItemQuantity = cartItem?.quantity || 0;
  const isInCart = !!cartItem;

  const increaseQuantity = async () => {
    if (cartItem && cartItemQuantity >= cartItem.product.quantity) {
      showToast('재고가 부족합니다.');
      return;
    }
    try {
      if (!isInCart) {
        await cartData.mutate(
          () => addCartItem({ productId: id, quantity: 1 }).then(() => {}),
          getCartItemList
        );
      }
      if (isInCart) {
        await cartData.mutate(
          () => updateCartItem(cartItem!.id, cartItemQuantity + 1),
          getCartItemList
        );
      }
    } catch (error) {
      showToast('장바구니에서 상품를 더할 수 없습니다.');
    }
  };

  const deleteCartItemById = async () => {
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
      if (cartItem && cartItemQuantity !== 1) {
        await cartData.mutate(
          () => updateCartItem(cartItem!.id, cartItemQuantity - 1),
          getCartItemList
        );
      }
      if (cartItemQuantity === 1) {
        await deleteCartItemById();
      }
    } catch (error) {
      showToast('재고가 부족합니다.');
    }
  };

  return { isInCart, cartItemQuantity, increaseQuantity, decreaseQuantity, deleteCartItemById };
};
