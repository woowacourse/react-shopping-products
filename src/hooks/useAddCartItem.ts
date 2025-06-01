import { useEffect, useState } from 'react';
import { useToast } from './useToast';
import { AddCartItemType, cartDataType } from '../types/cartItem';
import postCartItem from '../api/postCartItem';
import { CART_LIMIT } from '../constants/carts';
import useSetItemCount from './useSetItemCount';
import { useAsyncHandler } from './useAsyncHandler';

function useAddCartItem({
  refetchCarts,
  carts,
}: {
  refetchCarts: () => Promise<void>;
  carts: cartDataType[] | null;
}) {
  const [isOverItemCounts, setIsOverItemCounts] = useState(false);
  const { itemCount } = useSetItemCount(carts);
  const { handleAsyncOperation, error, clearError } = useAsyncHandler(
    '장바구니에 상품을 추가하는 중 오류가 발생했습니다',
  );

  useToast(
    !error && isOverItemCounts
      ? `장바구니는 최대 ${CART_LIMIT}개의 상품을 담을 수 있습니다.`
      : null,
    'error',
  );

  const handleAddCartItem = async ({ productId, quantity }: AddCartItemType) => {
    if (itemCount >= CART_LIMIT) {
      setIsOverItemCounts(true);
      return;
    }

    await handleAsyncOperation(async () => {
      await postCartItem({ productId, quantity });
      await refetchCarts();
    });
  };

  useEffect(() => {
    if (error) {
      setIsOverItemCounts(true);
      return;
    }
    setIsOverItemCounts(false);
  }, [error]);

  return {
    handleAddCartItem,
    isOverItemCounts,
    itemCount,
    error: error || '',
    clearError,
  };
}

export default useAddCartItem;
