import { useQuery } from '@tanstack/react-query';
import { fetchCartItem } from '../api';
import { QUERY_KEYS } from '../constant/queryKeys';
import { useToast } from './useToast';

export function useCartItems() {
  const { showToast } = useToast();

  const fetchCart = async () => {
    try {
      const response = await fetchCartItem(0, 100);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        showToast('카트 아이템을 불러오는 데 실패했습니다');
      }
    }
  };

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.CART],
    queryFn: fetchCart,
  });

  return { cartItems: data ?? [] };
}
