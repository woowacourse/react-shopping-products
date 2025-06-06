import deleteCartItem from '../api/deleteCartItem';
import { cartDataType } from '../types/cartItem';
import { useAsyncHandler } from './useAsyncHandler';
import { findCartId } from '../utils/findCartId';

function useDeleteCartItem({
  refetchCarts,
  carts,
}: {
  refetchCarts: () => Promise<void>;
  carts: cartDataType[] | null;
}) {
  const { handleAsyncOperation, error, clearError } = useAsyncHandler(
    '장바구니에서 상품을 삭제하는 중 오류가 발생했습니다',
  );

  const handleDeleteCartItem = async ({ productId }: { productId: number }) => {
    const cartId = findCartId(carts, productId);

    await handleAsyncOperation(async () => {
      await deleteCartItem({ cartId });
      await refetchCarts();
    });
  };

  return {
    handleDeleteCartItem,
    error: error || '',
    clearError,
  };
}

export default useDeleteCartItem;
