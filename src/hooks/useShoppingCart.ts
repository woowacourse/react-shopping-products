import { useCallback } from 'react';
import { useData } from './useData';
import { CartItem } from '../components/ShoppingCartModal/cart.type';
import {
  addShoppingCart,
  deleteShoppingCart,
  updateShoppingCart,
  getShoppingCart,
} from '../APIs/shoppingCartApi';

const PARAMS = new URLSearchParams({ page: '0', size: '50' }).toString();

export const useShoppingCart = () => {
  const { data, loading, error, refetch, setLoading, setError } = useData<
    CartItem[]
  >({
    key: 'cart-items',
    endpoint: `/cart-items?${PARAMS}`,
    fetchFunction: getShoppingCart,
  });

  const add = useCallback(
    async (productId: number) => {
      setLoading('cart-items', true);
      try {
        await addShoppingCart({
          endpoint: '/cart-items',
          requestBody: { productId, quantity: 1 },
        });
        await refetch();
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : '장바구니 추가 중 알 수 없는 오류가 발생했습니다.';
        setError('cart-items', message);
        setTimeout(() => {
          setError('cart-items', null);
        }, 3000);
      } finally {
        setLoading('cart-items', false);
      }
    },
    [refetch, setError, setLoading]
  );

  const remove = useCallback(
    async (cartItemId: number | null) => {
      if (cartItemId == null) return;

      setLoading('cart-items', true);
      try {
        await deleteShoppingCart({
          endpoint: '/cart-items',
          cartItemId,
        });
        await refetch();
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : '장바구니 삭제 중 알 수 없는 오류가 발생했습니다.';
        setError('cart-items', message);
        setTimeout(() => {
          setError('cart-items', null);
        }, 3000);
      } finally {
        setLoading('cart-items', false);
      }
    },
    [refetch, setError, setLoading]
  );

  const update = useCallback(
    async (cartItemId: number, quantity: number) => {
      setLoading('cart-items', true);
      try {
        await updateShoppingCart({
          endpoint: `/cart-items/${cartItemId}`,
          requestBody: { quantity },
        });
        await refetch();
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : '장바구니 수량 수정 중 알 수 없는 오류가 발생했습니다.';
        setError('cart-items', message);
        setTimeout(() => {
          setError('cart-items', null);
        }, 3000);
      } finally {
        setLoading('cart-items', false);
      }
    },
    [refetch, setError, setLoading]
  );

  return { data, loading, error, add, remove, update };
};
