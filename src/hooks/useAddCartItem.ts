import { fetchPostCartItems } from '@apis/index';
import { useState } from 'react';

const useAddCartItem = (refetch: () => Promise<void>) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const addCartItem = async (productId: number) => {
    try {
      setLoading(true);
      setError('');
      await fetchPostCartItems({ productId });
      await refetch();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    addCartItem,
    loading,
    error,
  };
};

export default useAddCartItem;
