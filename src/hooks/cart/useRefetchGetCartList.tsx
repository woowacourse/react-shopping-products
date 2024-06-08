import { QUERY_KEYS } from '@/constants/queryKeys';
import { useQueryClient } from '@tanstack/react-query';

const useRefetchGetCartList = () => {
  const queryClient = useQueryClient();

  const invalidateCartQuery = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] });
  };

  return {
    invalidateCartQuery,
  };
};

export default useRefetchGetCartList;
