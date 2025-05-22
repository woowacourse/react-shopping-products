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
  const [isErrorAddCartItem, setIsErrorAddCartItem] = useState(false);
  const [isErrorDeleteCartItem, setIsErrorDeleteCartItem] = useState(false);
  const [errorAddCartItemMessage, setErrorAddCartItemMessage] = useState('');
  const [errorDeleteCartItemMessage, setErrorDeleteCartItemMessage] = useState('');
  const [isOverItemCounts, setIsOverItemCounts] = useState(false);
  const [itemCount, setItemCount] = useState(0);

  useToast(errorAddCartItemMessage);
  useToast(errorDeleteCartItemMessage);
  useToast(isOverItemCounts ? `장바구니는 최대 ${CART_LIMIT}개의 상품을 담을 수 있습니다.` : null);

  const handleAddCartItem = async ({ productId, quantity }: AddCartItemType) => {
    if (itemCount >= CART_LIMIT) {
      setIsOverItemCounts(true);
      return;
    }

    try {
      await postCartItem({
        productId,
        quantity,
      });
      refetchCarts();
    } catch (error) {
      setIsErrorAddCartItem(true);
      setErrorAddCartItemMessage(
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
      setIsErrorDeleteCartItem(true);
      setErrorDeleteCartItemMessage(
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
    isErrorAddCartItem,
    isErrorDeleteCartItem,
    isOverItemCounts,
    itemCount,
    errorAddCartItemMessage,
    errorDeleteCartItemMessage,
  };
}

export default useCartManagement;
