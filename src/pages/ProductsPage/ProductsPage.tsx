import Header from '../../components/Header/Header';
import { useEffect } from 'react';
import useGetCarts from '../../hooks/useGetCarts';
import { productPageContainer } from './ProductsPage.style';
import { useToast } from '../../hooks/useToast';
import ProductContent from '../../components/ProductContent/ProductContent';
import { ProductProvider } from '../../contexts/ProductContext';

function ProductsPage() {
  const { isLoading, isError, carts, cartItemCount } = useGetCarts();
  const { openToast } = useToast();

  useEffect(() => {
    if (isError) {
      openToast('장바구니 정보를 불러오지 못했습니다.', 'error');
    }
  }, [isError, openToast]);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <div className={productPageContainer}>
      <Header cartItemCount={cartItemCount} />
      <ProductProvider>
        <ProductContent cartItemCount={cartItemCount} carts={carts} />
      </ProductProvider>
    </div>
  );
}

export default ProductsPage;
