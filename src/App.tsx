import './styles/reset.css';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import ToastProvider from './contexts/ToastContext';
import { DataProvider } from './contexts/DataContext';

function App() {
  return (
    <ToastProvider>
      <DataProvider>
        <ProductsPage />
      </DataProvider>
    </ToastProvider>
  );
}

export default App;
