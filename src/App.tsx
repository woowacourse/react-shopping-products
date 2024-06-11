import './reset.css';
import './index.css';

import ProductPage from './page/ProductPage';
import { CartProvider } from './context/ShoppingCartContext';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useToast } from './hooks/useToast';

function App() {
  const { createToast } = useToast();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        networkMode: 'always',
      },
    },
    queryCache: new QueryCache({
      onError: (error) => {
        console.log(error);
        createToast(error.message);
      },
    }),
  });
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <ProductPage />
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
