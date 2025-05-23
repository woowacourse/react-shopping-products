import deleteCartItem from '../api/deleteCartItem';
import postCartItem from '../api/postCartItem';
import { CartDataType } from '../contexts/CartContext';
import { AddCartItemType } from '../types/cartItem';
import { useToast } from './useToast';

export function useCartManagement({
  cartItemCount,
  carts,
  refetchCarts,
}: {
  cartItemCount: number;
  carts: CartDataType[] | null;
  refetchCarts: () => void;
}) {
  const { openToast } = useToast();

  const addCartItem = async ({ productId, quantity }: AddCartItemType) => {
    if (cartItemCount >= 50) {
      openToast('장바구니는 최대 50개의 상품을 담을 수 있습니다.', 'error');
      return false;
    }

    const res = await postCartItem({
      productId,
      quantity,
    });

    if (!res.ok) {
      openToast('장바구니에 상품을 담지 못했습니다.', 'error');
      return false;
    }

    refetchCarts();
    return true;
  };

  const deleteItemFromCart = async ({ productId }: { productId: number }) => {
    const cartId = carts?.filter((cart) => cart.product.id === productId)[0]?.id || 0;
    const res = await deleteCartItem({ cartId });

    if (!res.ok) {
      openToast('장바구니에 상품을 빼지 못했습니다.', 'error');
      return false;
    }

    refetchCarts();
    return true;
  };

  return {
    addCartItem,
    deleteItemFromCart,
  };
}
