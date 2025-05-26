import './styles/reset.css';
import { useModal } from '@sanghee01/modal';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import CartModal from './components/CartModal/CartModal';
import { ToastProvider } from './context/Toast/ToastProvider';
import { DataProvider } from './context/DataStore/DataProvider';

function App() {
  const { isOpen, handleOpen, handleClose } = useModal();

  return (
    <DataProvider>
      <ToastProvider>
        <ProductsPage onCartClick={handleOpen} />
        <CartModal isOpen={isOpen} onClose={handleClose} />
      </ToastProvider>
    </DataProvider>
  );
}

export default App;
