import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

import useToast from './hooks/useToast';

const QueryProvider = ({ children }: PropsWithChildren) => {
  const toast = useToast();

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => toast.error(error.message),
    }),
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueryProvider;
