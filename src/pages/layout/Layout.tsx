import * as S from './Layout.styles';
import { Outlet } from 'react-router-dom';
import Header from '../../components/header/Header';
import useData from '../../hooks/@common/useData';
import { getCartItems } from '../../services/cartItemServices';
import { getProducts } from '../../services/productServices';
import { useState } from 'react';
import { ErrorMessageProvider } from '../../context/ErrorMessageContext';
import useCartItems from '../../hooks/features/useCartItems';
import { DataProvider } from '../../context/DataContext';
import CartModal from '../../components/features/cartModal/CartModal';
import type { CartItemType, ProductItemType } from '../../types/data';
import { CATEGORY_OPTIONS, SELECT_SORT_OPTIONS } from '../../constants/systemConstants';
import {
  ERROR_MESSAGE_DURATION,
  ERROR_MESSAGE_ANIMATION_DELAY,
} from '../../constants/systemConstants';

const Layout = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const handleErrorMessage = (message: string) => {
    setErrorMessage(message);
    setIsToastVisible(true);

    setTimeout(() => {
      setIsToastVisible(false);
    }, ERROR_MESSAGE_DURATION);

    setTimeout(() => {
      setErrorMessage('');
    }, ERROR_MESSAGE_DURATION + ERROR_MESSAGE_ANIMATION_DELAY);
  };

  const cartItemsResource = useData<CartItemType[], []>({
    fetchFunc: getCartItems,
    defaultArgs: [],
  });

  const productItemsResource = useData<ProductItemType[], [string, string]>({
    fetchFunc: getProducts,
    defaultArgs: [CATEGORY_OPTIONS[0], SELECT_SORT_OPTIONS[0]],
  });

  const dataResources = {
    cartItemsResource: cartItemsResource,
    productItemsResource: productItemsResource,
  };

  const { handleAddCartItem, handleRemoveCartItem, handleUpdateCartItem } = useCartItems({
    dataResource: cartItemsResource,
    handleErrorMessage,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <DataProvider dataResource={{ ...dataResources }}>
      <ErrorMessageProvider
        errorMessage={errorMessage}
        handleErrorMessage={handleErrorMessage}
        isToastVisible={isToastVisible}
      >
        <S.LayoutContainer>
          <Header onCartModalOpen={handleModalOpen} />
          <Outlet />
          <CartModal
            isCartModalOpen={isModalOpen}
            onModalClose={handleModalClose}
            onAddCartItem={handleAddCartItem}
            onRemoveCartItem={handleRemoveCartItem}
            onUpdateCartItem={handleUpdateCartItem}
          />
        </S.LayoutContainer>
      </ErrorMessageProvider>
    </DataProvider>
  );
};

export default Layout;
