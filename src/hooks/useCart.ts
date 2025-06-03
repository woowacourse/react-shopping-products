import { useCallback } from 'react';
import { getCartItem } from '../api/cart';
import { CartResponse, CartItem } from '../types/product';
import { useData } from './useData';

export function useCart() {
  const fetcher = async () => {
    return await getCartItem();
  };

  const {
    data: cart,
    error,
    isLoading,
    refetch: fetchCart,
  } = useData<CartResponse>('cart-items', fetcher, {
    cacheTime: 1 * 60 * 1000, // 1분
    refetchOnMount: true, // 항상 최신 데이터 fetch
  });

  const isInCart = useCallback(
    (productId: number) => {
      if (!cart?.content) {
        return false;
      }

      return cart.content.some((item: CartItem) => item.product.id === productId);
    },
    [cart],
  );

  const getCartItemId = useCallback(
    (productId: number) => {
      if (!cart?.content) {
        return null;
      }

      const cartItem = cart.content.find((item: CartItem) => item.product.id === productId);

      return cartItem ? cartItem.id : null;
    },
    [cart],
  );

  return {
    cart,
    isLoading,
    isError: !!error,
    setIsError: () => {}, // 기존 API 호환성을 위해 유지
    fetchCart,
    isInCart,
    getCartItemId,
  };
}
