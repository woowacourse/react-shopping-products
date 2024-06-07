import './reset.css';
import './index.css';

import ProductPage from './page/ProductPage';
import { ToastContextProvider } from './context/ToastContextProvider';
import { CartProvider } from './context/ShoppingCartContext';
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
