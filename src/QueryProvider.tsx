import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren } from 'react';

import useToast from './hooks/useToast';

const QueryProvider = ({ children }: PropsWithChildren) => {
  const toast = useToast();

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => toast.error(error.message),
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
};

export default QueryProvider;
