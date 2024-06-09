import { useQuery } from '@tanstack/react-query';
import { fetchCartItem } from '../api';
import { QUERY_KEY } from '../constant/queryKey';

const useCartItemQuery = () => {
  const { data, isError, isSuccess, isFetching, refetch } = useQuery({
    queryKey: [QUERY_KEY.CART_ITEMS],
    queryFn: fetchCartItem,
  });

  return {
    cartItems: data,
    cartItemsQueryError: isError,
    cartItemsQuerySuccess: isSuccess,
    cartItemsQueryFetching: isFetching,
    refetchCartItems: refetch,
  };
};

export default useCartItemQuery;
