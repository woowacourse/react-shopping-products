import './reset.css';
import ToastContainer from './components/common/Toast/ToastContainer';
import ProductListPage from './pages/ProductListPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import QueryErrorBoundary from './components/Error/QueryErrorBoundary';
import { Suspense } from 'react';
import LoadingSpinner from './components/common/LoadingSpinner/LoadingSpinner';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
