import { useToast } from '../component/@common/Toast/context';
import useCart from './useCart';
import { cartApi } from '../api/cart';
import { CartItem } from '../types/common';

const useCartManager = () => {
  const { cartData, fetchCartData } = useCart();
  const { openToast } = useToast();

  const handleAddCart = async (productId: number) => {
    try {
      await cartApi.addToCart(productId);
      await fetchCartData();
      openToast('상품이 장바구니에 추가되었습니다.', true);
    } catch (error) {
      openToast('장바구니 담기에 실패했어요...', false);
    }
  };

  const handleRemoveCart = async (productId: number) => {
    try {
      const cartItem = cartData.find(
        (item: CartItem) => item.product.id === productId
      );

      if (!cartItem) {
        console.error('장바구니에서 해당 상품을 찾을 수 없습니다:', productId);
        openToast('장바구니에서 상품을 찾을 수 없습니다.', false);
        return;
      }

      const targetId = cartItem.id;
      await cartApi.removeFromCart(targetId);
      await fetchCartData();
      openToast('상품이 장바구니에서 제거되었습니다.', true);
    } catch (error) {
      console.error('장바구니 아이템 삭제 중 오류 발생:', error);
      openToast('장바구니 빼기에 실패했어요...', false);
    }
  };

  return {
    cartData,
    handleAddCart,
    handleRemoveCart,
    fetchCartData,
  };
};

export default useCartManager;
