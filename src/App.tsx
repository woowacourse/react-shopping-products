import { renderWithProviders } from './utils/renderWithProviders';
import { ModalProvider } from 'oa-modal-components';
import ProductPage from './pages/ProductPage';
import './styles/reset.css';

function App() {
  return renderWithProviders(
    <ModalProvider>
      <ProductPage />
    </ModalProvider>,
  );
}

export default App;
