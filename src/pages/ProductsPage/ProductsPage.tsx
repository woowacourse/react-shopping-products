import Header from '../../components/Header/Header';
import { useEffect, useState } from 'react';
import useGetCarts from '../../hooks/useGetCarts';
import { productPageContainer } from './ProductsPage.style';
import { useToast } from '../../hooks/useToast';
import ProductContent from '../../components/ProductContent/ProductContent';
import CartModal from '../../components/CartModal/CartModal';

function ProductsPage() {
  const { isLoading, isError } = useGetCarts();
  const { openToast } = useToast();
  const [isOpenCartModal, setIsOpenCartModal] = useState(false);

  useEffect(() => {
    if (isError) {
      openToast('장바구니 정보를 불러오지 못했습니다.', 'error');
    }
  }, [isError, openToast]);

  return (
    <div className={productPageContainer}>
      {isLoading && <div>로딩중...</div>}
      <Header onClickCartIcon={() => setIsOpenCartModal(true)} />
      <ProductContent />
      {isOpenCartModal && <CartModal onClose={() => setIsOpenCartModal(false)} />}
    </div>
  );
}

export default ProductsPage;
