import './styles/reset.css';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import ToastProvider from './contexts/ToastContext';
import { CartProvider } from './contexts/CartContext';

function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <ProductsPage />
      </CartProvider>
    </ToastProvider>
  );
}

export default App;
