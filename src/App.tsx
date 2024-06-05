import './reset.css';
import { CartItemListProvider } from './hooks/useCartItemList';
import ProductListPageContainer from './pages/ProductListPageContainer';
import ToastProvider from './hooks/useToast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '472px' }}>
          <ToastProvider>
            <CartItemListProvider>
              <ProductListPageContainer />
            </CartItemListProvider>
          </ToastProvider>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
