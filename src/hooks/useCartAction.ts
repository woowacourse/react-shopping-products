import { fetchDeleteCartItems, fetchGetCartItems, fetchPostCartItems } from '@apis/index';
import { CartItem } from '@appTypes/index';
import { useState } from 'react';

import useFetch from './useFetch';

function useCartAction() {
  const { fetch } = useFetch<typeof fetchGetCartItems>(fetchGetCartItems);
  const [cartItems, setCartItem] = useState<CartItem[]>([]);

  const getCartItemList = async () => {
    const firstResult = await fetch();
    if (!firstResult) return;

    const { totalNumbers, cartItems, isTotalCartItems } = firstResult;

    if (isTotalCartItems) {
      return setCartItem(cartItems);
    }
    // page-0인 장바구니 목록외에 더 데이터를 불러와야 할 경우
    const result = await fetch(totalNumbers);
    if (!result) return;

    setCartItem(result.cartItems);
  };

  const addCartItem = async (productId: number) => {
    await fetchPostCartItems({ productId });
    await getCartItemList();
  };

  const deleteCarItem = async (cartItem: CartItem | undefined) => {
    if (!cartItem) return;

    await fetchDeleteCartItems({ cartItemId: cartItem.id });
    await getCartItemList();
  };

  const handleCartAction = ({
    isInCart,
    productId,
    cartItem,
  }: {
    isInCart: boolean;
    productId: number;
    cartItem: CartItem | undefined;
  }) => {
    if (isInCart) return deleteCarItem(cartItem);
    addCartItem(productId);
  };

  return { cartItems, getCartItemList, handleCartAction };
}

export default useCartAction;
