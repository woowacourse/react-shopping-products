import './styles/reset.css';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import ToastProvider from './contexts/ToastContext';

function App() {
  return (
    <ToastProvider>
      <ProductsPage />;
    </ToastProvider>
  );
}

export default App;
