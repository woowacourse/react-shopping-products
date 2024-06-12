import * as S from '../../components/ShoppingProductsPage/style';

import { useState } from 'react';

import ProductsContainer from '../ProductsContainer';
import ToastPopup from '../ToastPopup';
import Header from '../common/Header';
import Main from '../common/Main';
import CartModal from '../CartModal';

const ShoppingProductsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <S.ShoppingProductsPage>
      <Header handleCartButtonOnClick={openModal} />
      <ToastPopup />
      <Main>
        <ProductsContainer />
      </Main>
      <CartModal isModalOpen={isModalOpen} closeModal={closeModal} />
    </S.ShoppingProductsPage>
  );
};

export default ShoppingProductsPage;
