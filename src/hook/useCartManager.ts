import { useToast } from '../component/@common/Toast/context';
import useCart from './useCart';
import { cartApi } from '../api/cart';
import { CartItem } from '../types/common';
import { useState } from 'react';

const useCartManager = () => {
  const { cartData, fetchCartData } = useCart();
  const { openToast } = useToast();
  const [productCounts, setProductCounts] = useState<Record<number, number>>(
    {}
  );

  const getProductCount = (productId: number): number => {
    return productCounts[productId] || 0;
  };

  const updateProductCount = (productId: number, count: number) => {
    setProductCounts((prev) => ({
      ...prev,
      [productId]: count,
    }));
  };

  const handleCountChange = async (
    productId: number,
    newCount: number
  ): Promise<void> => {
    const currentCount = getProductCount(productId);
    const diff = newCount - currentCount;

    if (diff > 0) {
      // 증가 - 장바구니에 추가
      const success = await handleAddCart(productId);
      if (success) {
        updateProductCount(productId, newCount);
      }
    } else if (diff < 0) {
      // 감소 - 장바구니에서 제거
      const success = await handleRemoveCart(productId);
      if (success) {
        updateProductCount(productId, newCount);
      }
    }
  };

  const handleAddCart = async (productId: number): Promise<boolean> => {
    try {
      await cartApi.addToCart(productId);
      await fetchCartData();
      openToast('상품이 장바구니에 추가되었습니다.', true);
      return true;
    } catch (error) {
      openToast('장바구니 담기에 실패했어요...', false);
      return false;
    }
  };

  const handleRemoveCart = async (productId: number): Promise<boolean> => {
    try {
      if (!Array.isArray(cartData)) {
        console.error('cartData가 배열이 아닙니다:', cartData);
        openToast('장바구니 데이터를 처리할 수 없습니다.', false);
        return false;
      }

      const cartItem = cartData.find(
        (item: CartItem) => item.product.id === productId
      );

      if (!cartItem) {
        console.error('장바구니에서 해당 상품을 찾을 수 없습니다:', productId);
        openToast('장바구니에서 상품을 찾을 수 없습니다.', false);
        return false;
      }

      const targetId = cartItem.id;
      await cartApi.removeFromCart(targetId);
      await fetchCartData();
      openToast('상품이 장바구니에서 제거되었습니다.', true);
      return true;
    } catch (error) {
      console.error('장바구니 아이템 삭제 중 오류 발생:', error);
      openToast('장바구니 빼기에 실패했어요...', false);
      return false;
    }
  };

  return {
    cartData,
    handleAddCart,
    handleRemoveCart,
    fetchCartData,
    getProductCount,
    handleCountChange,
  };
};

export default useCartManager;
