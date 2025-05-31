import { useEffect, useState } from 'react';
import { useToast } from './useToast';
import { AddCartItemType, cartDataType } from '../types/cartItem';
import postCartItem from '../api/postCartItem';
import { CART_LIMIT } from '../constants/carts';
import useSetItemCount from './useSetItemCount';

function useAddCartItem({
  refetchCarts,
  carts,
}: {
  refetchCarts: () => Promise<void>;
  carts: cartDataType[] | null;
}) {
  const [isErrorAddCartItem, setIsErrorAddCartItem] = useState(false);
  const [errorAddCartItemMessage, setErrorAddCartItemMessage] = useState<string | null>(null);
  const [isOverItemCounts, setIsOverItemCounts] = useState(false);
  const { itemCount } = useSetItemCount(carts);

  useToast(errorAddCartItemMessage, 'error');
  useToast(
    isOverItemCounts ? `장바구니는 최대 ${CART_LIMIT}개의 상품을 담을 수 있습니다.` : null,
    'error',
  );

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
      await refetchCarts();
      setErrorAddCartItemMessage(null);
      setIsErrorAddCartItem(false);
    } catch (error) {
      setIsErrorAddCartItem(true);
      setErrorAddCartItemMessage(
        error instanceof Error
          ? error.message
          : '장바구니에 상품을 추가하는 중 오류가 발생했습니다',
      );
    }
  };

  useEffect(() => {
    if (!isErrorAddCartItem) setIsOverItemCounts(false);
  }, [isErrorAddCartItem]);

  return {
    handleAddCartItem,
    isErrorAddCartItem,
    isOverItemCounts,
    itemCount,
    errorAddCartItemMessage: errorAddCartItemMessage || '',
  };
}

export default useAddCartItem;
