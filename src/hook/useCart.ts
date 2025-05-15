import { useEffect, useState } from 'react';
import { cartApi } from '../api/cart';
import { CartItem } from '../types/common';

const useCart = () => {
  const [cartData, setCartData] = useState<CartItem[]>([]);

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      const response = await cartApi.getCartItems();

      setCartData(response);
    } catch (error) {
      // 예외 처리 로직
      // TODO: Fallback page
    }
  };

  return { cartData, fetchCartData };
};

export default useCart;
