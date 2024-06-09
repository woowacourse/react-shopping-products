import { cartQueryConfig } from '@/constants/index';
import { useQuery } from '@tanstack/react-query';

const useCartItemTotalQuantity = () => {
  const {
    data: totalQuantity,
    isError,
    isLoading,
  } = useQuery(cartQueryConfig.cartTotalQuantity);

  return { totalQuantity, isError, isLoading };
};

export default useCartItemTotalQuantity;
