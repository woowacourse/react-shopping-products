import './reset.css';
import './index.css';

import ProductPage from './page/ProductPage';
import { ToastContextProvider } from './context/ToastContextProvider';
import { CartProvider } from './context/ShoppingCartCountContext';

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
