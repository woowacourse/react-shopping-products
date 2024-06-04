import './reset.css';
import './index.css';

import ProductPage from './page/ProductPage';
import { ToastContextProvider } from './contexts/ToastContextProvider';
import { CartProvider } from '@/contexts/CartListContext';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContextProvider>
        <CartProvider>
          <ProductPage />
        </CartProvider>
      </ToastContextProvider>
    </QueryClientProvider>
  );
}

export default App;
