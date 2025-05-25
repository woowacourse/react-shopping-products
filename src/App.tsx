import S from './App.module.css';
import Product from './routes/Product';
import { ErrorProvider } from './contexts/ErrorContext';

function App() {
  return (
    <div className={S.container}>
      <ErrorProvider>
        <Product />;
      </ErrorProvider>
    </div>
  );
}

export default App;
