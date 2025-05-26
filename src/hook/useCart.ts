import { useRef } from 'react';
import { CartItem } from '../types/common';
import { useResource } from './useResource';

const CART_ITEMS_URL = '/cart-items';

const useCart = () => {
  const paramsRef = useRef({ page: 0, size: 50 });

  const {
    data: cartDataResponse,
    isLoading,
    error,
    refetch: fetchCartData,
  } = useResource<{ content: CartItem[] }>(CART_ITEMS_URL, {
    params: paramsRef.current,
    initialData: { content: [] },
    autoFetch: true,
  });

  const cartData = cartDataResponse?.content || [];

  return {
    cartData,
    isLoading,
    error,
    fetchCartData,
  };
};

export default useCart;
