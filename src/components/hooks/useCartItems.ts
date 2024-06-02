import { useCallback, useState } from 'react';
import { CART_ITEMS_ENDPOINT } from '../../api/endpoints';
import useFetch from './useFetch';
import { CartItem } from '../../types';
import { MAX_CART_ITEMS_FETCH_SIZE } from '../../constants/paginationRules';

interface UseCartItemsResult {
  cartItems: CartItem[];
  getCartItems: () => void;
}

interface FetchCartItemsResponse {
  content: CartItem[];
}

export default function useCartItems(): UseCartItemsResult {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { fetchData } = useFetch<FetchCartItemsResponse>({
    url: CART_ITEMS_ENDPOINT,
  });

  const getCartItems = useCallback(async () => {
    fetchData({
      errorMessage: '일시적인 오류로 장바구니 정보를 불러오는 데 실패했습니다.',
      queryParams: {
        size: MAX_CART_ITEMS_FETCH_SIZE,
      },
    }).then((response) => {
      if (!response) return;

      const { content } = response;

      setCartItems(content);
    });
  }, [fetchData]);

  return { cartItems, getCartItems };
}
