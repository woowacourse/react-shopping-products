import * as S from '../../components/ShoppingProductsPage/style';

import { createContext, useState } from 'react';

import ProductsContainer from '../ProductsContainer';
import ToastPopup from '../ToastPopup';
import Header from '../common/Header';
import Main from '../common/Main';
import CartModal from '../CartModal';
import useToast from '../../hooks/useToast';

interface UseToastContextProps {
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const UseToastContext = createContext({} as UseToastContextProps);

const ShoppingProductsPage = () => {
  const { errorMessage, setErrorMessage } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <S.ShoppingProductsPage>
      <UseToastContext.Provider value={{ errorMessage, setErrorMessage }}>
        <Header handleCartButtonOnClick={openModal} />
        <ToastPopup />
        <Main>
          <ProductsContainer />
        </Main>
        <CartModal isModalOpen={isModalOpen} closeModal={closeModal} />
      </UseToastContext.Provider>
    </S.ShoppingProductsPage>
  );
};

export default ShoppingProductsPage;
