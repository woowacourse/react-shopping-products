import * as S from './App.styled';
import ErrorProvider from './contexts/ErrorContext';
import ProductListPage from './pages/productListPage/ProductListPage';
import { CartProvider } from './pages/productListPage/context/useCartContext';

function App() {
  return (
    <S.Global>
      <S.Wrap>
        <ErrorProvider>
          <CartProvider>
            <ProductListPage />
          </CartProvider>
        </ErrorProvider>
      </S.Wrap>
    </S.Global>
  );
}

export default App;
