import { fetchPostCartItems } from '@apis/index';
import useFetch from './useFetch';

const useAddCartItem = (refetch: () => Promise<void>) => {
  const { fetch, loading, error } = useFetch<typeof fetchPostCartItems>(fetchPostCartItems);

  const addCartItem = async (productId: number) => {
    await fetch({ productId });
    await refetch();
  };

  return {
    addCartItem,
    loading,
    error,
  };
};

export default useAddCartItem;
