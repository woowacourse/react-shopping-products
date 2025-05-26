import { cartApi } from '../../../api/cartApi';
import { CART_MAX_COUNT } from '../../../constants/constants';
import { useCartItemList } from '../../../pages/productListPage/context/useCartContext';
import { getCartItemId } from '../utils';

export const useProductItem = () => {
  const { cartItemList, setCartItemList, setErrorMessage } = useCartItemList();

  async function handleProductItem(action: string, productId: number, quantity?: number) {
    try {
      if (action === 'update') {
        const cartItemId = getCartItemId(productId, cartItemList);
        if (cartItemId) {
          await cartApi.patch(quantity!, cartItemId);
        }
      } else {
        if (cartItemList.length >= CART_MAX_COUNT) {
          setErrorMessage('장바구니에는 최대 50개의 상품만 담을 수 있습니다.');
          return;
        }
        await cartApi.post(productId, 1);
      }

      const rawCartItemList = await cartApi.get();
      setCartItemList(rawCartItemList);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  }

  return { cartItemList, handleProductItem };
};
