import { ErrorProvider } from './context/ErrorContext';
import ProductPage from './pages/ProductPage';
import './styles/reset.css';

function App() {
  return (
    <ErrorProvider>
      <ProductPage />
    </ErrorProvider>
  );
}

export default App;
