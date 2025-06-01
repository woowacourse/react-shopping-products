import { cartApi } from '../../../api/cartApi';
import { CART_MAX_COUNT } from '../../../constants/constants';
import { useError } from '../../../contexts/ErrorContext';
import { useCartItemList } from '../../../pages/productListPage/context/useCartContext';
import { getCartItemId, getCartItemState } from '../utils';

export const useProductItem = (id: number) => {
  const { cartItemList, setCartItemList } = useCartItemList();
  const { showError } = useError();
  const { quantity, isItemInCart, text, keyword } = getCartItemState(id, cartItemList);

  async function handleProductItem(action: string, productId: number, quantity?: number) {
    try {
      if (action === 'update') {
        const cartItemId = getCartItemId(productId, cartItemList);
        if (cartItemId) {
          await cartApi.patch(quantity!, cartItemId);
        }
      } else if (action === 'delete') {
        const cartItemId = getCartItemId(productId, cartItemList);
        if (cartItemId) {
          await cartApi.delete(cartItemId);
        }
      } else {
        if (cartItemList.length >= CART_MAX_COUNT) {
          showError('장바구니에는 최대 50개의 상품만 담을 수 있습니다.');
          return;
        }
        await cartApi.post(productId, 1);
      }

      const rawCartItemList = await cartApi.get({
        size: 20,
        page: 0,
      });
      setCartItemList(rawCartItemList);
    } catch (error) {
      if (error instanceof Error) {
        showError(error.message);
      }
    }
  }

  return { quantity, isItemInCart, text, keyword, handleProductItem };
};
