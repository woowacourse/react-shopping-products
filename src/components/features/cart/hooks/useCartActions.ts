import { showErrorToast } from '@/services/toastStore';
import {
  addCartItem,
  deleteCartItem,
  updateCartItem,
  useCartContext,
} from '..';

export function useCartActions() {
  const { cartCount: totalCartCount, refetch } = useCartContext();

  const addCart = async (productId: string) => {
    try {
      if (totalCartCount >= 50) {
        showErrorToast('장바구니는 최대 50개까지 담을 수 있습니다.');
        return;
      }
      await addCartItem(productId);
      refetch();
    } catch {
      showErrorToast('장바구니에 담는 데 실패했습니다.');
    }
  };

  const deleteCart = async (cartId: string | undefined) => {
    try {
      if (!cartId) return;

      await deleteCartItem(cartId);
      refetch();
    } catch {
      showErrorToast('장바구니에서 삭제하는 데 실패했습니다.');
    }
  };

  const updateCart = async (cartId: string | undefined, quantity: number) => {
    try {
      if (!cartId) return;

      await updateCartItem(cartId, quantity);
      refetch();
    } catch (error) {
      if (error instanceof Error) {
        showErrorToast(error.message);
      } else {
        showErrorToast('장바구니 수량 변경에 실패했습니다.');
      }
    }
  };

  return { addCart, deleteCart, updateCart };
}
