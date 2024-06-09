import * as S from '../../components/ShoppingProductsPage/style';

import { UseInfiniteQueryResult } from '@tanstack/react-query';
import { createContext, useState } from 'react';

import useProducts from '../../hooks/useProducts';
import ProductsContainer from '../ProductsContainer';
import ToastPopup from '../ToastPopup';
import Header from '../common/Header';
import Main from '../common/Main';
import CartModal from '../CartModal';

import { Category, Order, Product } from '../../types/product';

interface UseProductsContextProps {
  getProducts: UseInfiniteQueryResult<Product[], Error>;
  category: Category;
  handleCategoryChange: (selectedCategory: Category) => void;
  priceOrder: Order;
  handlePriceOrderChange: (selectedPriceOrder: Order) => void;
}

export const UseProductsContext = createContext({} as UseProductsContextProps);

const ShoppingProductsPage = () => {
  const { getProducts, category, handleCategoryChange, priceOrder, handlePriceOrderChange } =
    useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <UseProductsContext.Provider
      value={{
        getProducts,
        category,
        handleCategoryChange,
        priceOrder,
        handlePriceOrderChange,
      }}
    >
      <S.ShoppingProductsPage>
        <Header handleCartButtonOnClick={openModal} />
        <ToastPopup />
        <Main>
          <ProductsContainer />
        </Main>
        <CartModal isModalOpen={isModalOpen} closeModal={closeModal} />
      </S.ShoppingProductsPage>
    </UseProductsContext.Provider>
  );
};

export default ShoppingProductsPage;
