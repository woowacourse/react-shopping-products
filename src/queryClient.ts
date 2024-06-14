// src/queryClient.js
import { QueryClient, QueryCache } from '@tanstack/react-query';

const createQueryClient = (createToast: (message: string) => void) => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        networkMode: 'always',
      },
    },
    queryCache: new QueryCache({
      onError: (error) => {
        createToast(error.message);
      },
    }),
  });
};

export default createQueryClient;
