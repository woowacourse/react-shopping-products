import './reset.css';
import './index.css';

import ProductPage from './page/ProductPage';
import { ToastContextProvider } from './contexts/ToastContextProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <ToastContextProvider>
          <ProductPage />
        </ToastContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
