import { useData } from './useData';
import getCarts from '../api/getCarts';
import { cartDataType } from '../types/cartItem';
import { useToast } from './useToast';

type UseGetCartsReturn = {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  carts: cartDataType[] | null;
  refetchCarts: () => Promise<cartDataType[] | undefined>;
};

function useGetCarts(): UseGetCartsReturn {
  const { data, loading, error, refetch } = useData('cart-items', getCarts, {
    dependencies: [],
  });

  const errorMessage = error || '';
  useToast(errorMessage);

  const refetchCarts = async (): Promise<cartDataType[] | undefined> => {
    await refetch();
    return data || undefined;
  };

  return {
    carts: data,
    isLoading: loading,
    isError: !!error,
    errorMessage,
    refetchCarts,
  };
}

export default useGetCarts;
