import { useCallback, useEffect, useState } from 'react';

import { useCartRequest } from './useCartRequest';

import { CartItem } from '../types/Cart';

export const useCart = () => {
  const [cartData, setCartData] = useState<CartItem[]>([]);

  const handleCartData = useCallback((cartData: CartItem[]) => {
    setCartData(cartData);
  }, []);

  const { fetchCartProductData, addToCart, deleteFromCart } = useCartRequest(handleCartData);

  useEffect(() => {
    fetchCartProductData();
  }, [fetchCartProductData]);

  return {
    cartData,
    addToCart,
    deleteFromCart,
  };
};
