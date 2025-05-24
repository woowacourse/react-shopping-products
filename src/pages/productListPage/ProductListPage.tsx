import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import ProductControl from '../../components/ProductControl/ProductControl';
import ProductList from '../../components/ProductList/ProductList';
import * as S from './productListPage.styled';
import { ResponseProduct } from '../../api/types';
import { cartApi } from '../../api/cartApi';
import { productApi } from '../../api/productApi';
import LoadingIcon from '../../components/Icon/LoadingIcon';
import { useCartItemList } from './context/useCartContext';

function ProductListPage({ setErrorMessage }: { setErrorMessage: Dispatch<SetStateAction<string>> }) {
  const [productList, setProductList] = useState<ResponseProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setCartItemList } = useCartItemList();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rawCartItemList, rawProductList] = await Promise.all([cartApi.get(), productApi.get({ category: '', sort: 'price,asc' })]);

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
    <>
      {isLoading ? (
        <LoadingIcon />
      ) : (
        <>
          <Header />
          <S.MiddleContainer>
            <ProductControl setProductList={setProductList} setErrorMessage={setErrorMessage} />
            <ProductList productList={productList} setErrorMessage={setErrorMessage} />
          </S.MiddleContainer>
        </>
      )}
    </>
  );
}

export default ProductListPage;
