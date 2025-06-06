import { useCallback } from 'react';
import { useData } from './useData';
import getCarts from '../api/getCarts';
import { cartDataType } from '../types/cartItem';
import { useToast } from './useToast';

type UseGetCartsReturn = {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  carts: cartDataType[] | null;
  refetchCarts: () => Promise<void>;
};

function useGetCarts(): UseGetCartsReturn {
  const fetchUserCartItems = useCallback(async () => {
    const cartItems = await getCarts();
    return cartItems;
  }, []);

  const { data, loading, error, refetch } = useData('cart-items', fetchUserCartItems);

  useToast(error, 'error');

  return {
    carts: data,
    isLoading: loading,
    isError: !!error,
    errorMessage: error || '',
    refetchCarts: refetch,
  };
}

export default useGetCarts;
