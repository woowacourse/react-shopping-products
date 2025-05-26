import { ErrorProvider } from './context/ErrorContext';
import { DataProvider } from './context/DataContext';
import { ModalProvider } from 'oa-modal-components';
import ProductPage from './pages/ProductPage';
import './styles/reset.css';

function App() {
  return (
    <ErrorProvider>
      <DataProvider>
        <ModalProvider>
          <ProductPage />
        </ModalProvider>
      </DataProvider>
    </ErrorProvider>
  );
}

export default App;
