import * as S from './App.styled';
import Header from './components/Header/Header';
import ProductControl from './components/ProductControl/ProductControl';
import ProductList from './components/ProductList/ProductList';
import ErrorBox from './components/common/ErrorBox/ErrorBox';
import getProductList from './api/ProductListApi';
import { useEffect, useState } from 'react';
import { ResponseProduct } from './api/types';
function App() {
  const [productList, setProductList] = useState<ResponseProduct[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getProductList();
      setProductList(data);
    })();
  }, []);

  return (
    <S.Global>
      <S.Wrap>
        <Header />
        <ErrorBox backgroundColor='#FFC9C9' text='에러 발생' />
        <S.MiddleContainer>
          <ProductControl />
          <ProductList productList={productList} />
        </S.MiddleContainer>
      </S.Wrap>
    </S.Global>
  );
}

export default App;
