import { fetchGetCartList, FetchGetCartListResponse } from '@apis/index';
import { QUERY_KEY, QUERY_TIME } from '@constants/index';
import { CartItem } from '@src/appTypes';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

const useCartList = (
  option: Omit<UseQueryOptions<FetchGetCartListResponse>, 'queryKey' | 'queryFn' | 'staleTime'> = {},
) => {
  const { data, error, isLoading, isSuccess } = useQuery<FetchGetCartListResponse>({
    ...option,
    queryKey: [QUERY_KEY.cartList],
    queryFn: fetchGetCartList,
    staleTime: QUERY_TIME.cartList.staleTime,
    refetchOnMount: option.refetchOnMount ?? false,
  });

  const makeCartListMap = (cartList: CartItem[] | undefined) => {
    if (!cartList) return undefined;

    return new Map(cartList.map((item) => [item.product.id, item]));
  };

  return { error, isLoading, isSuccess, cartListMap: makeCartListMap(data?.cartList) };
};

export default useCartList;
