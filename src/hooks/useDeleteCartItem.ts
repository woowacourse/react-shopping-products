import { fetchDeleteCartItems } from '@apis/index';
import useFetch from './useFetch';
import { CartItem } from '@src/appTypes';

const useAddCartItem = (refetch: () => Promise<void>) => {
  const { fetch, loading, error } = useFetch<typeof fetchDeleteCartItems>(fetchDeleteCartItems);

  const deleteCarItem = async (cartItem: CartItem | undefined) => {
    if (!cartItem) return;

    await fetch({ cartItemId: cartItem.id });
    await refetch();
  };
  return {
    deleteCarItem,
    loading,
    error,
  };
};

export default useAddCartItem;
