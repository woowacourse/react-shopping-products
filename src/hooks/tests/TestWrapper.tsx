import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren, Suspense } from 'react';
import QueryErrorBoundary from '../../components/Error/QueryErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
    },
  },
});

const TestWrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    <QueryErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
    </QueryErrorBoundary>
  </QueryClientProvider>
);

export default TestWrapper;
