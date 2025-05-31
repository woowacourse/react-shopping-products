import { useData } from './useData';
import { CartItem } from '../components/ShoppingCartModal/cart.type';
import {
  addShoppingCart,
  deleteShoppingCart,
  getShoppingCart,
  updateShoppingCart,
} from '../APIs/shoppingCartApi';
import { useCallback } from 'react';

const PARAMS = new URLSearchParams({ page: '0', size: '50' }).toString();

export const useShoppingCart = () => {
  const { data, error, setLoading, setError, refetch } = useData<CartItem[]>({
    key: 'cart-items',
    endpoint: `/cart-items?${PARAMS}`,
    fetchFunction: getShoppingCart,
  });

  const create = useCallback(
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
          setError('cart-items', '');
        }, 3000);
      } finally {
        setLoading('cart-items', false);
      }
    },
    [setError, setLoading, refetch]
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
          setError('cart-items', '');
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
          setError('cart-items', '');
        }, 3000);
      } finally {
        setLoading('cart-items', false);
      }
    },
    [refetch, setError, setLoading]
  );

  return { data, error, create, remove, update };
};
