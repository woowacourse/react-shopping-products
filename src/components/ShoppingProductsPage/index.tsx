import { createContext, useContext, useEffect } from 'react';
import * as S from '../../components/ShoppingProductsPage/style';

import useProducts from '../../hooks/useProducts';
import ProductsContainer from '../ProductsContainer';
import ToastPopup from '../ToastPopup';
import Header from '../common/Header';
import Main from '../common/Main';
import { UseCartItemsContext } from '../../App';
import { Category, Order, Product } from '../../types/product';

interface UseProductsContextProps {
  products: Product[];
  page: number;
  fetchNextPage: () => void;
  category: Category;
  handleCategoryChange: (selectedCategory: Category) => void;
  priceOrder: Order;
  handlePriceOrderChange: (selectedPriceOrder: Order) => void;
  productsLoading: boolean;
  productsError: unknown;
}

const UseProductsInitialState: UseProductsContextProps = {
  products: [],
  page: 0,
  fetchNextPage: () => {},
  category: 'all',
  handleCategoryChange: () => {},
  priceOrder: 'asc',
  handlePriceOrderChange: () => {},
  productsLoading: false,
  productsError: null,
};

export const UseProductsContext = createContext(UseProductsInitialState);

const ShoppingProductsPage = () => {
  const {
    products,
    productsLoading,
    productsError,
    page,
    fetchNextPage,
    category,
    handleCategoryChange,
    priceOrder,
    handlePriceOrderChange,
  } = useProducts();

  const { getCartItems } = useContext(UseCartItemsContext);

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <UseProductsContext.Provider
      value={{
        products,
        productsLoading,
        productsError,
        page,
        fetchNextPage,
        category,
        handleCategoryChange,
        priceOrder,
        handlePriceOrderChange,
      }}
    >
      <S.ShoppingProductsPage>
        <Header />
        <ToastPopup />
        <Main>
          <ProductsContainer />
        </Main>
      </S.ShoppingProductsPage>
    </UseProductsContext.Provider>
  );
};

export default ShoppingProductsPage;
