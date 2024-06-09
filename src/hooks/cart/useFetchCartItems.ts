import { cartQueryConfig } from '@/constants/index';
import { CartItem } from '@/types/index';
import { useQuery } from '@tanstack/react-query';

const useFetchCartItems = () => {
  const {
    data: cartItemList,
    isError,
    isLoading,
  } = useQuery<CartItem[]>({
    ...cartQueryConfig.cartList,
    initialData: [],
  });

  return { cartItemList, isError, isLoading };
};

export default useFetchCartItems;
