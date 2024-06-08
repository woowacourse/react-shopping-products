import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { Global } from '@emotion/react';
import ProductPage from '@pages/ProductPage/ProductPage';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { resetCSS } from '@styles/resetCSS';
import { useMemo } from 'react';
import { useToastContext } from '@components/common/Toast/provider/ToastProvider';

function App() {
  const { showToast } = useToastContext();
  const queryClient = useMemo(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: showToast,
        }),
        mutationCache: new MutationCache({
          onError: showToast,
        }),
      }),
    [showToast]
  );
  return (
    <QueryClientProvider client={queryClient}>
      <Global styles={resetCSS} />
      <ProductPage />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
