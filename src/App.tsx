import { ErrorProvider } from './context/ErrorContext';
import { DataProvider } from './context/DataContext';
import ProductPage from './pages/ProductPage';
import './styles/reset.css';

function App() {
  return (
    <ErrorProvider>
      <DataProvider>
        <ProductPage />
      </DataProvider>
    </ErrorProvider>
  );
}

export default App;
