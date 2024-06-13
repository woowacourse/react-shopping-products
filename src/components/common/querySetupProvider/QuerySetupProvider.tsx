import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import { useToast } from '@/hooks/useToast';

const QuerySetupProvider = ({ children }: { children: React.ReactNode }) => {
  const { toastError } = useToast();

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => toastError(`${error.name}:${error.message}`),
    }),
    mutationCache: new MutationCache({
      onError: (error) => toastError(`${error.name}:${error.message}`),
    }),
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QuerySetupProvider;
