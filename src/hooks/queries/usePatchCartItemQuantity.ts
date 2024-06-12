import { patchCartItemQuantity } from '@/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constant/queryKey';

interface Props {
  onError: () => void;
}

const usePatchCartItemQuantity = ({ onError }: Props) => {
  const client = useQueryClient();

  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: patchCartItemQuantity,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: [QUERY_KEY.CART_ITEMS],
      });
    },
    onError,
  });
  return {
    patchCartItemQuantity: mutate,
    isPatchCartItemQuantitySuccess: isSuccess,
    isPatchCartItemQuantityError: isError,
  };
};

export default usePatchCartItemQuantity;
