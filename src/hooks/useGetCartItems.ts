import { useCallback, useEffect, useState } from 'react';
import getCarts from '../api/getCarts';
import { cartDataType } from '../types/cartItem';

function useGetCarts() {
  const [carts, setCarts] = useState<cartDataType[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchCarts = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getCarts();
      setCarts(data);
      return data;
    } catch (error) {
      setIsError(true);
      setErrorMessage(
        error instanceof Error ? error.message : '장바구니 정보를 불러오지 못했습니다',
      );
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCarts();
  }, [fetchCarts]);

  const refetchCarts = useCallback(async () => {
    return await fetchCarts();
  }, [fetchCarts]);

  return { isLoading, isError, errorMessage, carts, refetchCarts };
}

export default useGetCarts;
