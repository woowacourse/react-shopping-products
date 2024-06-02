import { fetchGetCartItems } from '@apis/index';
import useFetch from './useFetch';
import { useEffect, useState } from 'react';
import { CartItem } from '@appTypes/index';

const useLoadCartItems = () => {
  const { fetch, loading, error } = useFetch<typeof fetchGetCartItems>(fetchGetCartItems);
  const [cartItems, setCartItem] = useState<CartItem[]>([]);

  const getCartItemList = async () => {
    const firstResult = await fetch();
    if (!firstResult) return;

    const { totalNumbers, cartItems, totalElements } = firstResult;

    if (totalElements === cartItems.length) {
      return setCartItem(cartItems);
    }
    // page-0인 장바구니 목록외에 더 데이터를 불러와야 할 경우
    const result = await fetch(totalNumbers);
    if (!result) return;

    setCartItem(result.cartItems);
  };

  useEffect(() => {
    getCartItemList();
  }, []);

  return {
    refetch: getCartItemList,
    cartItems,
    loading,
    error,
  };
};

export default useLoadCartItems;
