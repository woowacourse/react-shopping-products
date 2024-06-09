import { CART_ITEMS_ENDPOINT } from '@_api/endpoints';
import { fetchData } from '@_api/fetch';
import { CartItem } from '@_types/cartItem';
import { useQuery } from '@tanstack/react-query';

interface FetchCartItemsResponse {
  last: boolean;
  number: number;
  content: CartItem[];
}

const fetchCartItems = async (): Promise<FetchCartItemsResponse> => {
  return await fetchData<FetchCartItemsResponse>(CART_ITEMS_ENDPOINT, {
    size: 100,
  });
};

export default function useGetCartItems() {
  const { data, status } = useQuery<FetchCartItemsResponse>({
    queryKey: ['cart'],
    queryFn: () => fetchCartItems(),
    staleTime: 1000 * 60 * 60,
    networkMode: 'always',
  });

  // TODO: 에러 처리 - toast

  const cartItems = (data && data.content) || [];

  return { cartItems, status };
}
