import patchCartItem from '../api/patchCartItem';
import { cartDataType } from '../types/cartItem';
import { useAsyncHandler } from './useAsyncHandler';
import { findCartId } from '../utils/findCartId';

function useUpdateCartItem({
  refetchCarts,
  carts,
}: {
  refetchCarts: () => Promise<void>;
  carts: cartDataType[] | null;
}) {
  const { handleAsyncOperation, error, clearError } = useAsyncHandler(
    '장바구니 수량을 업데이트하는 중 오류가 발생했습니다',
  );

  const handleUpdateCartItem = async ({
    productId,
    quantity,
  }: {
    productId: number;
    quantity: number;
  }) => {
    const cartId = findCartId(carts, productId);

    await handleAsyncOperation(async () => {
      await patchCartItem({ cartId, quantity });
      await refetchCarts();
    });
  };

  return {
    handleUpdateCartItem,
    error: error || '',
    clearError,
  };
}

export default useUpdateCartItem;
