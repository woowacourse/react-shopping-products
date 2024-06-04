import './reset.css';
import './index.css';

import ProductPage from './page/ProductPage';
import { ToastContextProvider } from './contexts/ToastContextProvider';
import { CartProvider } from '@/contexts/CartListContext';

function App() {
  return (
    <ToastContextProvider>
      <CartProvider>
        <ProductPage />
      </CartProvider>
    </ToastContextProvider>
  );
}

export default App;
