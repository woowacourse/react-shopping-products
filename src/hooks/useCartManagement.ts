import { useEffect, useState } from 'react';
import postCartItem from '../api/postCartItem';
import deleteCartItem from '../api/deleteCartItem';
import { AddCartItemType, cartDataType } from '../types/cartItem';
import { CART_LIMIT } from '../constants/carts';
import { useToast } from './useToast';

function useCartManagement({
  refetchCarts,
  carts,
}: {
  refetchCarts: () => void;
  carts: cartDataType[] | null;
}) {
  const [isErrorAddCardItem, setIsErrorAddCardItem] = useState(false);
  const [isErrorDeleteCardItem, setIsErrorDeleteCardItem] = useState(false);
  const [errorAddCardItemMessage, setErrorAddCardItemMessage] = useState('');
  const [errorDeleteCardItemMessage, setErrorDeleteCardItemMessage] = useState('');
  const [isOverItemCounts, setIsOverItemCounts] = useState(false);
  const [itemCount, setItemCount] = useState(0);

  useToast(errorAddCardItemMessage);
  useToast(errorDeleteCardItemMessage);
  useToast(isOverItemCounts ? `장바구니는 최대 ${CART_LIMIT}개의 상품을 담을 수 있습니다.` : null);

  const handleAddCartItem = async ({ productId, quantity }: AddCartItemType) => {
    if (itemCount >= CART_LIMIT) {
      setIsOverItemCounts(true);
      setTimeout(() => {
        setIsOverItemCounts(false);
      }, 3000);

      return;
    }

    try {
      await postCartItem({
        productId,
        quantity,
      });
      refetchCarts();
    } catch (error) {
      setIsErrorAddCardItem(true);
      setErrorAddCardItemMessage(
        error instanceof Error
          ? error.message
          : '장바구니에 상품을 추가하는 중 오류가 발생했습니다',
      );
    }
  };

  const handleDeleteCartItem = async ({ productId }: { productId: number }) => {
    const cartId = carts?.filter((cart) => cart.product.id === productId)[0].id || 0;

    try {
      await deleteCartItem({ cartId });
      refetchCarts();
    } catch (error) {
      setIsErrorDeleteCardItem(true);
      setErrorDeleteCardItemMessage(
        error instanceof Error
          ? error.message
          : '장바구니에 상품을 삭제하는 중 오류가 발생했습니다',
      );
    }
  };

  useEffect(() => {
    if (carts) {
      setItemCount(new Set(carts?.map((cart) => cart.product.id)).size);
    }
  }, [carts]);

  return {
    handleAddCartItem,
    handleDeleteCartItem,
    isErrorAddCardItem,
    isErrorDeleteCardItem,
    isOverItemCounts,
    itemCount,
    errorAddCardItemMessage,
    errorDeleteCardItemMessage,
  };
}

export default useCartManagement;
