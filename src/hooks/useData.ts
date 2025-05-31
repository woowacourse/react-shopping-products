import { useEffect, useCallback } from 'react';
import { Product } from '../components/ProductCardList/product.type';
import { CartItem } from '../components/ShoppingCartModal/cart.type';
import { useDataContext } from '../contexts/useDataContext';

interface UseDataOptions<T> {
  key: string;
  endpoint: string;
  fetchFunction: (endpoint: string) => Promise<T>;
}

export const useData = <T extends CartItem[] | Product[] | null>({
  key,
  endpoint,
  fetchFunction,
}: UseDataOptions<T>) => {
  const { state, setData, setLoading, setError } = useDataContext();

  const fetchData = useCallback(async () => {
    setLoading(key, true);
    setError(key, '');

    try {
      const data = await fetchFunction(endpoint);
      setData(key, data ?? []);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      setError(key, errorMessage);
    }
  }, [key, endpoint, setData, setLoading, setError, fetchFunction]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const currentState = state[key] || {
    data: [],
    loading: false,
    error: '',
  };

  return {
    data: currentState.data as T,
    loading: currentState.loading,
    error: currentState.error,
    setLoading,
    setError,
    refetch: fetchData,
  };
};
