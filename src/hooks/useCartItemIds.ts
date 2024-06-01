import { fetchGetCartItems } from '@apis/index';
import { CartItem } from '@appTypes/index';
import { useEffect, useState } from 'react';

import useFetch from './useFetch';

function useCartItemIds() {
  const { fetch, error } = useFetch<typeof fetchGetCartItems>(fetchGetCartItems);
  const [cartItemIds, setCartItemIds] = useState<Map<number, number> | null>(null);

  const getCartItemList = async () => {
    const firstResult = await fetch();
    if (!firstResult) return;

    const { totalNumbers, cartItems, isTotalCartItems } = firstResult;

    if (isTotalCartItems) {
      return cartItems as CartItem[];
    }
    // page-0인 장바구니 목록외에 더 데이터를 불러와야 할 경우
    const result = await fetch(totalNumbers);
    if (!result) return;

    return result.cartItems as CartItem[];
  };

  const refreshCartItemIds = async () => {
    const cartItems = await getCartItemList();
    if (!cartItems) return setCartItemIds(null);

    setCartItemIds(new Map(cartItems.map((item) => [item.product.id, item.id])));
  };

  useEffect(() => {
    refreshCartItemIds();
  }, []);

  return { cartItemIds, refreshCartItemIds, error };
}

export default useCartItemIds;
