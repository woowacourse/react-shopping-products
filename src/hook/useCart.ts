import { useEffect, useState } from 'react';
import { cartApi } from '../api/cart';
import { CartItem } from '../types/common';

const useCart = () => {
  const [cartData, setCartData] = useState<CartItem[]>([]);

  useEffect(() => {
    loadCartData();
  }, []);

  const loadCartData = async () => {
    try {
      const response = await cartApi.getCartItems();
      setCartData(response);
    } catch (error) {
      // 에러 발생 시 빈 배열로 설정
      setCartData([]);
      // TODO: Fallback page 또는 에러 처리 로직 추가
    }
  };

  return { cartData, loadCartData };
};

export default useCart;
