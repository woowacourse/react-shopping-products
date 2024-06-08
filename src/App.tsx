import './reset.css';
import './index.css';

import ProductPage from './page/ProductPage';
import { ToastContextProvider } from './contexts/ToastContextProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContextProvider>
        <ProductPage />
      </ToastContextProvider>
    </QueryClientProvider>
  );
}

export default App;
