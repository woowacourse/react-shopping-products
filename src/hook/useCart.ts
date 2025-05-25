import { useEffect, useState, useCallback } from 'react';
import { cartApi } from '../api/cart';
import { CartItem } from '../types/common';
import { useToast } from '../component/@common/Toast/context/toastContext';

const useCart = () => {
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const { openToast } = useToast();

  useEffect(() => {
    loadCartData();
  }, []);

  const loadCartData = useCallback(async () => {
    try {
      const response = await cartApi.getCartItems();
      setCartData(response);
    } catch (error) {
      // 에러 발생 시 빈 배열로 설정
      setCartData([]);
      // TODO: Fallback page 또는 에러 처리 로직 추가
    }
  }, []);

  const addCart = useCallback(
    async (productId: number) => {
      try {
        await cartApi.addToCart(productId);

        loadCartData();
        openToast('상품이 장바구니에 추가되었습니다.', true);
      } catch (error) {
        openToast('장바구니 담기에 실패했어요...', false);
      }
    },
    [loadCartData, openToast]
  );

  const removeCart = useCallback(
    async (cartId: number) => {
      try {
        const targetId = cartData.find(
          (item: CartItem) => item.product.id === cartId
        )?.id;

        await cartApi.removeFromCart(targetId as number);

        await loadCartData();
        openToast('상품이 장바구니에서 제거되었습니다.', true);
      } catch (error) {
        openToast('장바구니 빼기에 실패했어요...', false);
      }
    },
    [cartData, loadCartData, openToast]
  );

  return { cartData, loadCartData, addCart, removeCart };
};

export default useCart;
