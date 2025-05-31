import { useEffect, useState } from 'react';
import { CartItem } from '../../types/common';
import { useLoadCart } from './useLoadCart';
import { useAddCart } from './useAddCart';
import { useRemoveCart } from './useRemoveCart';
import { useIncreaseCart } from './useIncreaseCart';
import { useDecreaseCart } from './useDecreaseCart';

const useCart = () => {
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const loadCartData = useLoadCart({ onSuccess: setCartData });
  const addCart = useAddCart({ onSuccess: setCartData });
  const removeCart = useRemoveCart({ onSuccess: setCartData });
  const increaseCart = useIncreaseCart({ onSuccess: setCartData });
  const decreaseCart = useDecreaseCart({ onSuccess: setCartData });

  useEffect(() => {
    loadCartData();
  }, []);

  return {
    cartData,
    loadCartData,
    addCart,
    removeCart,
    increaseCart,
    decreaseCart,
  };
};

export default useCart;
