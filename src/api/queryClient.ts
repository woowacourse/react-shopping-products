import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 0, throwOnError: true },
    mutations: { retry: 0, throwOnError: true },
  },
});
