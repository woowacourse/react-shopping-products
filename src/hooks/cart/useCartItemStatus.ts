import { useMemo } from 'react';
import useFetchCartItems from './useFetchCartItems';

const useCartItemStatus = (productId: number) => {
  const { cartItemList, isLoading, isError } = useFetchCartItems();

  const isInCart = useMemo(() => {
    if (!isLoading && !isError) {
      return cartItemList.some((item) => item.product.id === productId);
    }
    return false;
  }, [cartItemList, isLoading, isError, productId]);

  const quantity = useMemo(() => {
    if (!isLoading && !isError && isInCart) {
      const cartItem = cartItemList.find(
        (item) => item.product.id === productId,
      );
      return cartItem ? cartItem.quantity : 0;
    }
    return 0;
  }, [cartItemList, isLoading, isError, productId, isInCart]);

  return { quantity, isInCart, isLoading, isError };
};

export default useCartItemStatus;
