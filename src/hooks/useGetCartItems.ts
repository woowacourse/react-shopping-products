import { useData } from './useData';
import getCarts from '../api/getCarts';
import { cartDataType } from '../types/cartItem';
import { useToast } from './useToast';

type UseGetCartsReturn = {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  carts: cartDataType[] | null;
  refetchCarts: () => Promise<void>;
};

function useGetCarts(): UseGetCartsReturn {
  const { data, loading, error, refetch } = useData('cart-items', getCarts);

  const errorMessage = error || '';
  useToast(errorMessage);

  return {
    carts: data,
    isLoading: loading,
    isError: !!error,
    errorMessage,
    refetchCarts: refetch,
  };
}

export default useGetCarts;
