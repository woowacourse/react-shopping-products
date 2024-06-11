import './reset.css';
import ToastContainer from './components/common/Toast/ToastContainer';
import ProductListPage from './pages/ProductListPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import QueryErrorBoundary from './components/Error/QueryErrorBoundary';
import { Suspense } from 'react';
import LoadingSpinner from './components/common/LoadingSpinner/LoadingSpinner';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
      staleTime: 1000 * 20,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <QueryErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '472px' }}>
              <ProductListPage />
              <ToastContainer />
            </div>
          </div>
        </Suspense>
      </QueryErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
