import { ErrorProvider } from './context/ErrorContext';
import { LoadingProvider } from './context/LoadingContext';
import ProductPage from './pages/ProductPage';
import './styles/reset.css';

function App() {
  return (
    <ErrorProvider>
      <LoadingProvider>
        <ProductPage />
      </LoadingProvider>
    </ErrorProvider>
  );
}

export default App;
