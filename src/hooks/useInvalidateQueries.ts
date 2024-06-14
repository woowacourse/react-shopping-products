import { QueryKey, useQueryClient } from '@tanstack/react-query';

const useInvalidateQueries = (queryKey: QueryKey) => {
  const queryClient = useQueryClient();

  const invalidateQueries = () => {
    queryClient.invalidateQueries({ queryKey });
  };

  return { invalidateQueries };
};

export default useInvalidateQueries;
