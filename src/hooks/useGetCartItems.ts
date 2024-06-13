import { CART_ITEMS_ENDPOINT } from '@_api/endpoints';
import { fetchData } from '@_api/fetch';
import { QUERY_KEYS } from '@_constants/queryKeys';
import { CartItem } from '@_types/cartItem';
import { useQuery } from '@tanstack/react-query';

interface FetchCartItemsResponse {
  last: boolean;
  number: number;
  content: CartItem[];
}

interface UseGetCartItemsResult {
  cartItems: CartItem[];
  error: Error | null;
  isLoading: boolean;
}

const fetchCartItems = async (): Promise<FetchCartItemsResponse> => {
  return await fetchData<FetchCartItemsResponse>(CART_ITEMS_ENDPOINT, {
    size: 100,
  });
};

export default function useGetCartItems(): UseGetCartItemsResult {
  const { data, error, isLoading } = useQuery<FetchCartItemsResponse>({
    queryKey: [QUERY_KEYS.cart],
    queryFn: () => fetchCartItems(),
    networkMode: 'always',
    retry(failureCount, error) {
      const errorStatus = Number(error.message);
      if (errorStatus >= 400 && errorStatus < 500) {
        return false;
      }

      if (errorStatus >= 500 && errorStatus < 600) {
        return failureCount < 3;
      }
      return false;
    },
  });

  const cartItems = (data && data.content) || [];

  return { cartItems, error, isLoading };
}
