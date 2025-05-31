import { useState } from 'react';
import patchCartItem from '../api/patchCartItem';
import { cartDataType } from '../types/cartItem';
import { useToast } from './useToast';

function useUpdateCartItem({
  refetchCarts,
  carts,
}: {
  refetchCarts: () => Promise<void>;
  carts: cartDataType[] | null;
}) {
  const [isErrorUpdateCartItem, setIsErrorUpdateCartItem] = useState(false);
  const [errorUpdateCartItemMessage, setErrorUpdateCartItemMessage] = useState<string | null>(null);

  useToast(errorUpdateCartItemMessage, 'error');

  const handleUpdateCartItem = async ({
    productId,
    quantity,
  }: {
    productId: number;
    quantity: number;
  }) => {
    const cartId = carts?.filter((cart) => cart.product.id === productId)[0].id || 0;

    try {
      await patchCartItem({ cartId, quantity });
      await refetchCarts();
      setErrorUpdateCartItemMessage(null);
      setIsErrorUpdateCartItem(false);
    } catch (error) {
      setIsErrorUpdateCartItem(true);
      setErrorUpdateCartItemMessage(
        error instanceof Error
          ? error.message
          : '장바구니 수량을 업데이트하는 중 오류가 발생했습니다',
      );
    }
  };

  return {
    handleUpdateCartItem,
    isErrorUpdateCartItem,
    errorUpdateCartItemMessage: errorUpdateCartItemMessage || '',
  };
}

export default useUpdateCartItem;
