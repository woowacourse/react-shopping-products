import ToastProvider from '@components/common/Toast/provider/ToastProvider';
import AppLayout from '@components/layout/AppLayout/AppLayout';
import { Global } from '@emotion/react';
import ProductPage from '@pages/ProductPage/ProductPage';
import { resetCSS } from '@styles/resetCSS';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import * as Styled from './App.styled';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: 3,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <Styled.AppContainer>
        <ToastProvider>
          <Global styles={resetCSS} />
          <AppLayout>
            <ProductPage />
          </AppLayout>
        </ToastProvider>
      </Styled.AppContainer>
    </QueryClientProvider>
  );
}

export default App;
