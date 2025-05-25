import S from './App.module.css';
import Product from './routes/Product';
import { ErrorProvider } from './contexts/ErrorContext';
import { DataProvider } from './contexts/DataContext';

function App() {
  return (
    <div className={S.container}>
      <ErrorProvider>
        <DataProvider>
          <Product />;
        </DataProvider>
      </ErrorProvider>
    </div>
  );
}

export default App;
