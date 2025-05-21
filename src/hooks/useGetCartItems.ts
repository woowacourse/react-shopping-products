import { useCallback, useEffect, useState } from 'react';
import getCarts from '../api/getCarts';
import { cartDataType } from '../types/cartItem';

function useGetCarts() {
  const [carts, setCarts] = useState<cartDataType[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchCarts = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getCarts();
      setCarts(data);
      return data;
    } catch (e) {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
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

  return { isLoading, isError, carts, refetchCarts };
}

export default useGetCarts;
