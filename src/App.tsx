import './styles/reset.css';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import { ToastProvider } from './context/Toast/ToastProvider';
import { DataProvider } from './context/DataStore/DataProvider';

function App() {
  return (
    <DataProvider>
      <ToastProvider>
        <ProductsPage />
      </ToastProvider>
    </DataProvider>
  );
}

export default App;
