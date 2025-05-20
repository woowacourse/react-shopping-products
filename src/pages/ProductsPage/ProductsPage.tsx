import Header from '../../components/Header/Header';
import { useEffect } from 'react';
import useGetCarts from '../../hooks/useGetCartItems';
import { productPageContainer } from './ProductsPage.style';
import { useToast } from '../../hooks/useToast';
import ProductContent from '../../components/ProductContent/ProductContent';

function ProductsPage() {
  const { isLoading: isLoadingCarts, isError: isErrorCarts, carts, cartItemCount } = useGetCarts();
  const { openToast } = useToast();

  useEffect(() => {
    if (isErrorCarts) {
      openToast('장바구니 정보를 불러오지 못했습니다.', 'error');
    }
  }, [isErrorCarts, openToast]);

  if (isLoadingCarts) {
    return <div>로딩중...</div>;
  }

  return (
    <div className={productPageContainer}>
      <Header cartItemCount={cartItemCount} />
      <ProductContent cartItemCount={cartItemCount} carts={carts} />
    </div>
  );
}

export default ProductsPage;
