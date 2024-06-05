import { QueryClient, QueryClientProvider } from 'react-query';

import { Global } from '@emotion/react';
import ProductPage from '@pages/ProductPage/ProductPage';
import { resetCSS } from '@styles/resetCSS';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Global styles={resetCSS} />
      <ProductPage />
    </QueryClientProvider>
  );
}

export default App;
