import { getAllCartItemList } from '@/api/cartItemAPI';
import { useQuery } from '@tanstack/react-query';
import { CART_ITEM_KEYS } from '@/queries/keys';

const useGetAllCartItemList = () => {
  const { data, isLoading } = useQuery({
    queryKey: CART_ITEM_KEYS.ALL,
    queryFn: getAllCartItemList,
  });

  return {
    allCartItemList: data,
    isLoading,
  };
};

export default useGetAllCartItemList;
