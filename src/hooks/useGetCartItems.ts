import { FetchCartItemsResponse, fetchCartItems } from '@_api/cart';
import { QUERY_KEYS } from '@_constants/queryKeys';
import { CartItem } from '@_types/cartItem';
import { useQuery } from '@tanstack/react-query';

interface UseGetCartItemsResult {
  cartItems: CartItem[];
  error: Error | null;
  isLoading: boolean;
}

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
