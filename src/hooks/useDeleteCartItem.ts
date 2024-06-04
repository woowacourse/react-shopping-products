import { fetchDeleteCartItems } from '@apis/index';
import { CartItem } from '@src/appTypes';
import { useState } from 'react';

const useDeleteCartItem = (refetch: () => Promise<void>) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const deleteCarItem = async (cartItem: CartItem | undefined) => {
    if (!cartItem) return;

    try {
      setLoading(true);
      setError('');
      await fetchDeleteCartItems({ cartItemId: cartItem.id });
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
    deleteCarItem,
    loading,
    error,
  };
};

export default useDeleteCartItem;
