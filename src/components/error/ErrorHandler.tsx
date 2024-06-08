import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import { useToast } from '@/hooks/useToast';

const ErrorHandler = ({ children }: { children: React.ReactNode }) => {
  const { toastError } = useToast();

  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        networkMode: 'always',
        onError: (error) => toastError(`${error.name}:${error.message}`),
      },
      queries: {
        networkMode: 'always',
      },
    },
    queryCache: new QueryCache({
      onError: (error) => toastError(`${error.name}:${error.message}`),
    }),
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ErrorHandler;
