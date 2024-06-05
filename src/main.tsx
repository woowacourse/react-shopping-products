import * as Styled from './main.styled';

import App from './App.tsx';
import ReactDOM from 'react-dom/client';
import ToastProvider from '@components/common/Toast/provider/ToastProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={true} />
    <Styled.MainContainer>
      <ToastProvider>
        <App />
      </ToastProvider>
    </Styled.MainContainer>
  </QueryClientProvider>
);
