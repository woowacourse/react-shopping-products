import Header from '../../components/Header/Header';
import ProductControl from '../../components/ProductControl/ProductControl';
import ProductList from '../../components/ProductList/ProductList';
import * as S from './productListPage.styled';
import LoadingIcon from '../../components/Icon/LoadingIcon';
import { useProductPage } from './hooks/useProductPage';

function ProductListPage() {
  const { productList, setProductList, isLoading } = useProductPage();
  return (
    <>
      {isLoading ? (
        <LoadingIcon />
      ) : (
        <>
          <Header />
          <S.MiddleContainer>
            <ProductControl setProductList={setProductList} />
            <ProductList productList={productList} />
          </S.MiddleContainer>
        </>
      )}
    </>
  );
}

export default ProductListPage;
