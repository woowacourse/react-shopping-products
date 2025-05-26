import Header from '../../components/Header/Header';
import ProductControl from '../../components/ProductControl/ProductControl';
import ProductList from '../../components/ProductList/ProductList';
import * as S from './productListPage.styled';
import LoadingIcon from '../../components/Icon/LoadingIcon';
import { useProductPage } from './hooks/useProductPage';
import { Modal } from '@seo_dev/react-modal';
import { useState } from 'react';

function ProductListPage() {
  const { productList, setProductList, isLoading } = useProductPage();
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  return (
    <>
      {isLoading ? (
        <LoadingIcon />
      ) : (
        <>
          <Header setIsOpen={setIsOpen} />
          <S.MiddleContainer>
            <ProductControl setProductList={setProductList} />
            <ProductList productList={productList} />
          </S.MiddleContainer>
          {isOpen && (
            <Modal onClose={close}>
              <Modal.BackDrop />
              <Modal.Content position='bottom'>
                <Modal.Title>장바구니</Modal.Title>
                <p>이곳은 중앙에 위치한 모달입니다.</p>
                <Modal.CloseButton>닫기</Modal.CloseButton>
              </Modal.Content>
            </Modal>
          )}
        </>
      )}
    </>
  );
}

export default ProductListPage;
