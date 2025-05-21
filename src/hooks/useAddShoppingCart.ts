import { addShoppingCart } from '../APIs/shoppingCart';
import { useShoppingCartContext } from '../contexts/useShoppingCartContext';

export function useAddShoppingCart(productId: number) {
  const shoppingCart = useShoppingCartContext();

  return async () => {
    if (shoppingCart.items.length >= 50) {
      shoppingCart.updateError({
        is: true,
        message: '장바구니 최대 50개까지 담을 수 있습니다.',
      });
      return;
    }

    shoppingCart.updateIsLoading(true);
    try {
      const endpoint = '/cart-items';
      const requestBody = { productId, quantity: 1 };
      const newCartItems = await addShoppingCart({ endpoint, requestBody });
      shoppingCart.updateItems(newCartItems);
    } catch {
      shoppingCart.updateError({
        is: true,
        message: '상품을 장바구니에 추가하지 못했습니다.',
      });
    } finally {
      shoppingCart.updateIsLoading(false);
    }
  };
}
