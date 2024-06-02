import { fetchDeleteCartItems, fetchGetCartItems, fetchPostCartItems } from '@apis/index';
import { CartItem } from '@appTypes/index';
import { useEffect, useState } from 'react';

import useFetch from './useFetch';

function useCartAction() {
  const getFetchResult = useFetch<typeof fetchGetCartItems>(fetchGetCartItems);
  const postFetchResult = useFetch<typeof fetchPostCartItems>(fetchPostCartItems);
  const deleteFetchResult = useFetch<typeof fetchDeleteCartItems>(fetchDeleteCartItems);

  const [cartItems, setCartItem] = useState<CartItem[]>([]);
  const [cartActionError, setCartActionError] = useState(false);

  const getCartItemList = async () => {
    const firstResult = await getFetchResult.fetch();
    if (!firstResult) return;

    const { totalNumbers, cartItems, totalElements } = firstResult;

    if (totalElements === cartItems.length) {
      return setCartItem(cartItems);
    }
    // page-0인 장바구니 목록외에 더 데이터를 불러와야 할 경우
    const result = await getFetchResult.fetch(totalNumbers);
    if (!result) return;

    setCartItem(result.cartItems);
  };

  const addCartItem = async (productId: number) => {
    await postFetchResult.fetch({ productId });
    await getCartItemList();
  };

  const deleteCarItem = async (cartItem: CartItem | undefined) => {
    if (!cartItem) return;

    await deleteFetchResult.fetch({ cartItemId: cartItem.id });
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

  useEffect(() => {
    setCartActionError(getFetchResult.error || postFetchResult.error || deleteFetchResult.error);
  }, [getFetchResult.error, postFetchResult.error, deleteFetchResult.error]);

  return {
    cartItems,
    getCartItemList,
    handleCartAction,
    loading: getFetchResult.loading || postFetchResult.loading || deleteFetchResult.loading,
    error: cartActionError,
    setCartActionError,
  };
}

export default useCartAction;
