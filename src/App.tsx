import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Global } from '@emotion/react';
import ProductsProvider from './pages/ProductsProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import baseStyle from '@/style/base.style';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Global styles={baseStyle} />
      <ProductsProvider />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
