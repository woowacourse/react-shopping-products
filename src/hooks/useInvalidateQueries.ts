import { QueryKey, useQueryClient } from '@tanstack/react-query';

export default function useInvalidateQueries(queryKey: QueryKey) {
  const queryClient = useQueryClient();

  const invalidateQueries = () => {
    queryClient.invalidateQueries({ queryKey });
  };

  return { invalidateQueries };
}
