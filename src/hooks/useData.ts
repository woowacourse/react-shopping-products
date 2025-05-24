import { useEffect, useCallback } from 'react';
import { Product } from '../types/product.type';
import { CartItem } from '../types/cart.type';
import { useDataContext } from '../contexts/useDataContext';
import fetchProducts from '../APIs/productApi';

interface UseDataOptions {
  key: string;
  endpoint: string;
}

export const useData = <T = CartItem[] | Product[] | null>({
  key,
  endpoint,
}: UseDataOptions) => {
  const { state, setData, setLoading, setError } = useDataContext();

  const fetchData = useCallback(async () => {
    setLoading(key, true);
    setError(key, null);

    try {
      const data = await fetchProducts(endpoint);
      setData(key, data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      setError(key, errorMessage);
    }
  }, [key, endpoint, setData, setLoading, setError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const currentState = state[key] || {
    data: null,
    loading: false,
    error: null,
  };

  return {
    data: currentState.data as T,
    loading: currentState.loading,
    error: currentState.error,
    refetch: fetchData,
  };
};
