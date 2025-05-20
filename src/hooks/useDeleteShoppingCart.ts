import deleteShoppingCart from '../APIs/deleteShoppingCart';
import { useShoppingCartContext } from '../contexts/useShoppingCartContext';

export function useDeleteShoppingCart(cartItemId?: number) {
  const shoppingCart = useShoppingCartContext();

  return async () => {
    shoppingCart.updateIsLoading(true);
    try {
      const endpoint = '/cart-items';
      const newCartItems = await deleteShoppingCart({ endpoint, cartItemId });
      shoppingCart.updateItems(newCartItems);
    } catch {
      shoppingCart.updateError({
        is: true,
        message: '상품을 장바구니에서 삭제하지 못했습니다.',
      });
    } finally {
      shoppingCart.updateIsLoading(false);
    }
  };
}
