import * as S from './App.styled';
import Header from './components/Header/Header';
import ProductControl from './components/ProductControl/ProductControl';
import ProductList from './components/ProductList/ProductList';
import ErrorBox from './components/common/ErrorBox/ErrorBox';
import getProductList from './api/ProductListApi';
import { useEffect, useState } from 'react';
import { ResponseProduct } from './api/types';
import getCartItemList from './api/CartItemListApi';
function App() {
  const [productList, setProductList] = useState<ResponseProduct[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getProductList();
      const data2 = await getCartItemList();
      console.log('data2', data2);
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
