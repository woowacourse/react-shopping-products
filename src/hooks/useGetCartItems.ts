import { useCallback, useEffect, useState } from 'react';
import { ProductDTOType } from '../types/product';

type cartDataType = {
  id: number;
  quantity: number;
  product: ProductDTOType;
};

async function getCarts() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/cart-items?page=0&size=50`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic cm9zaWVsc2g6cGFzc3dvcmQ',
    },
  });

  if (!res.ok) {
    throw new Error('에러 발생');
  }
  const data = await res.json();
  return data.content;
}

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
      return null;
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
