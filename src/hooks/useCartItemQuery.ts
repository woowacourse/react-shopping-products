import { useQuery } from '@tanstack/react-query';
import { fetchCartItem } from '../api';

const useCartItemQuery = () => {
  const { data, isError, isSuccess, isFetching } = useQuery({
    queryKey: ['cartItems'],
    queryFn: fetchCartItem,
  });

  return {
    cartItems: data,
    cartItemsQueryError: isError,
    cartItemsQuerySuccess: isSuccess,
    cartItemsQueryFetching: isFetching,
  };
};

export default useCartItemQuery;
