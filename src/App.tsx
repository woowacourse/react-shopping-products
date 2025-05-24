import * as S from './App.styled';
import ErrorBox from './components/common/ErrorBox/ErrorBox';
import { useState } from 'react';
import ProductListPage from './pages/productListPage/ProductListPage';
import { CartProvider } from './pages/productListPage/context/useCartContext';

function App() {
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <S.Global>
      <S.Wrap>
        <CartProvider>
          <ProductListPage setErrorMessage={setErrorMessage} />
          <ErrorBox text={errorMessage} backgroundColor='#FFC9C9' setErrorMessage={setErrorMessage} />
        </CartProvider>
      </S.Wrap>
    </S.Global>
  );
}

export default App;
