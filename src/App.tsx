import * as S from './App.styled';
import ErrorBox from './components/common/ErrorBox/ErrorBox';
import ProductListPage from './pages/productListPage/ProductListPage';
import { CartProvider } from './pages/productListPage/context/useCartContext';

function App() {
  return (
    <S.Global>
      <S.Wrap>
        <CartProvider>
          <ProductListPage />
          <ErrorBox backgroundColor='#FFC9C9' />
        </CartProvider>
      </S.Wrap>
    </S.Global>
  );
}

export default App;
