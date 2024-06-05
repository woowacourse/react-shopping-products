import { fetchDeleteCartList, fetchPostCartList } from '@apis/index';

import useFetch from '../useFetch';

interface UseCartActionProps {
  refreshCartItemIds: () => Promise<void>;
}

const useCartAction = ({ refreshCartItemIds }: UseCartActionProps) => {
  const postFetchResult = useFetch<typeof fetchPostCartList>(fetchPostCartList);
  const deleteFetchResult = useFetch<typeof fetchDeleteCartList>(fetchDeleteCartList);

  const addCartItem = async (productId: number) => {
    await postFetchResult.fetch({ productId });
    await refreshCartItemIds();
  };

  const deleteCarItem = async (cartItemId: number | undefined) => {
    if (!cartItemId) return;

    await deleteFetchResult.fetch({ cartItemId });
    await refreshCartItemIds();
  };

  return {
    addCartItem,
    deleteCarItem,
    error: postFetchResult.error || deleteFetchResult.error,
  };
};

export default useCartAction;
