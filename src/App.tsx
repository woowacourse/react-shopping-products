import * as S from './App.styled';
import ErrorBox from './components/common/ErrorBox/ErrorBox';
import { useState } from 'react';
import ProductListPage from './pages/productListPage/ProductListPage';

function App() {
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <S.Global>
      <S.Wrap>
        <ProductListPage setErrorMessage={setErrorMessage} />
        <ErrorBox text={errorMessage} backgroundColor='#FFC9C9' setErrorMessage={setErrorMessage} />
      </S.Wrap>
    </S.Global>
  );
}

export default App;
