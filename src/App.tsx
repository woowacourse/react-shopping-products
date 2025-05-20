import * as S from './App.styled';
import Header from './components/Header/Header';
import ProductControl from './components/ProductControl/ProductControl';
import ProductList from './components/ProductList/ProductList';
import ErrorBox from './components/common/ErrorBox/ErrorBox';
import getProductList from './api/productListApi';
import getCartItemList from './api/cartItemListApi';
import LoadingIcon from './components/Icon/LoadingIcon';
import { useEffect, useState } from 'react';
import { ResponseCartItem, ResponseProduct } from './api/types';

function App() {
  const [productList, setProductList] = useState<ResponseProduct[]>([]);
  const [cartItemList, setCartItemList] = useState<ResponseCartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rawCartItemList, rawProductList] = await Promise.all([getCartItemList(), getProductList({ category: '', sort: 'price,asc' })]);

        setCartItemList(rawCartItemList);
        setProductList(rawProductList);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <S.Global>
      <S.Wrap>
        {isLoading ? (
          <LoadingIcon />
        ) : (
          <>
            <Header cartItemList={cartItemList} />
            <S.MiddleContainer>
              <ProductControl setProductList={setProductList} setErrorMessage={setErrorMessage} />
              <ProductList productList={productList} cartItemList={cartItemList} setCartItemList={setCartItemList} setErrorMessage={setErrorMessage} />
            </S.MiddleContainer>
          </>
        )}
        <ErrorBox text={errorMessage} backgroundColor='#FFC9C9' setErrorMessage={setErrorMessage} />
      </S.Wrap>
    </S.Global>
  );
}

export default App;
