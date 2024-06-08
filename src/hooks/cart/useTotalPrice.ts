import { useMemo } from 'react';
import useFetchCartItems from './useFetchCartItems';

const useTotalPrice = () => {
  const { cartItemList, isError, isLoading } = useFetchCartItems();

  const totalPrice = useMemo(() => {
    if (isError || isLoading) {
      return 0;
    }

    return cartItemList.reduce(
      (acc, cur) => acc + cur.quantity * cur.product.price,
      0,
    );
  }, [cartItemList, isError, isLoading]);

  return { totalPrice };
};

export default useTotalPrice;
