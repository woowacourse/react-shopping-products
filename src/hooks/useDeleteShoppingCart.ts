import deleteShoppingCart from '../APIs/deleteShoppingCart';
import { useShoppingCartContext } from '../contexts/useShoppingCartContext';

export function useDeleteShoppingCart(cartItemId?: number) {
  const {
    handleCartItemChange,
    handleShoppingCartError,
    handleIsShoppingLoading,
  } = useShoppingCartContext();

  return async () => {
    handleIsShoppingLoading(true);
    try {
      const endpoint = '/cart-items';
      const newCartItems = await deleteShoppingCart({ endpoint, cartItemId });
      handleCartItemChange(newCartItems);
    } catch {
      handleShoppingCartError({
        is: true,
        message: '상품을 장바구니에서 삭제하지 못했습니다.',
      });
    } finally {
      handleIsShoppingLoading(false);
    }
  };
}
