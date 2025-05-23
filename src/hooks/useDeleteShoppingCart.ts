import { deleteShoppingCart } from '../APIs/shoppingCartApi';
import { useShoppingCartContext } from '../contexts/useShoppingCartContext';

export function useDeleteShoppingCart(productId?: number) {
  const shoppingCart = useShoppingCartContext();
  const cartItemId = shoppingCart.items.find(
    (item) => item.product.id === productId
  )?.id;

  return async () => {
    shoppingCart.updateLoading(true);
    try {
      const endpoint = '/cart-items';
      const newCartItems = await deleteShoppingCart({ endpoint, cartItemId });
      shoppingCart.updateItems(newCartItems);
    } catch (error) {
      shoppingCart.updateError({
        is: true,
        message: '상품을 장바구니에서 삭제하지 못했습니다.',
      });
    } finally {
      shoppingCart.updateLoading(false);
    }
  };
}
