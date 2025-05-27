import { useEffect, useState } from 'react';
import { CartItem } from '../../types/common';
import { useLoadCart } from './useLoadCart';
import { useAddCart } from './useAddCart';
import { useRemoveCart } from './useRemoveCart';
import { usePatchCart } from './usePatchCart';

const useCart = () => {
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const loadCartData = useLoadCart({ onSuccess: setCartData });
  const addCart = useAddCart({ onSuccess: setCartData });
  const removeCart = useRemoveCart({ onSuccess: setCartData });
  const patchCart = usePatchCart({ onSuccess: setCartData });

  useEffect(() => {
    loadCartData();
  }, []);

  return {
    cartData,
    loadCartData,
    addCart,
    removeCart,
    patchCart,
  };
};

export default useCart;
