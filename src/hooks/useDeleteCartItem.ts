import { useState } from 'react';
import deleteCartItem from '../api/deleteCartItem';
import { cartDataType } from '../types/cartItem';
import { useToast } from './useToast';

function useDeleteCartItem({
  refetchCarts,
  carts,
}: {
  refetchCarts: () => Promise<void>;
  carts: cartDataType[] | null;
}) {
  const [isErrorDeleteCartItem, setIsErrorDeleteCartItem] = useState(false);
  const [errorDeleteCartItemMessage, setErrorDeleteCartItemMessage] = useState<string | null>(null);

  useToast(errorDeleteCartItemMessage, 'error');

  const handleDeleteCartItem = async ({ productId }: { productId: number }) => {
    const cartId = carts?.filter((cart) => cart.product.id === productId)[0].id || 0;

    try {
      await deleteCartItem({ cartId });
      await refetchCarts();
      setErrorDeleteCartItemMessage(null);
      setIsErrorDeleteCartItem(false);
    } catch (error) {
      setIsErrorDeleteCartItem(true);
      setErrorDeleteCartItemMessage(
        error instanceof Error
          ? error.message
          : '장바구니에 상품을 삭제하는 중 오류가 발생했습니다',
      );
    }
  };

  return {
    handleDeleteCartItem,
    isErrorDeleteCartItem,
    errorDeleteCartItemMessage: errorDeleteCartItemMessage || '',
  };
}

export default useDeleteCartItem;
