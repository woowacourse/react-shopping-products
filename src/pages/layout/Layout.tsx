import * as S from './Layout.styles';
import { Outlet } from 'react-router-dom';
import Header from '../../components/header/Header';
import useData from '../../hooks/useData';
import { getCartItems } from '../../services/cartItemServices';
import { getProducts } from '../../services/productServices';
import { useState } from 'react';
import { ErrorMessageProvider } from '../../context/ErrorMessageContext';
import useCartItems from '../../hooks/useCartItems';
import { DataProvider } from '../../context/DataContext';
import CartModal from '../../components/cartModal/CartModal';
import type { CartItemType, ProductItemType } from '../../types/data';
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

  const cartItemsResource = useData<CartItemType[]>({
    fetchFunc: getCartItems,
  });

  const productItemsResource = useData<ProductItemType[]>({
    fetchFunc: getProducts,
  });

  const dataResources = {
    cartItemsResource: cartItemsResource,
    productItemsResource: productItemsResource,
  };

  const { handleAddCartItems, handleRemoveCartItems, handleUpdateCartItems } = useCartItems({
    dataResource: cartItemsResource,
    handleErrorMessage,
  });

  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const handleCartModalOpen = () => {
    setIsCartModalOpen(true);
  };
  const handleCartModalClose = () => {
    setIsCartModalOpen(false);
  };

  return (
    <DataProvider dataResource={{ ...dataResources }}>
      <ErrorMessageProvider
        errorMessage={errorMessage}
        handleErrorMessage={handleErrorMessage}
        isToastVisible={isToastVisible}
      >
        <S.LayoutContainer>
          <Header onCartModalOpen={handleCartModalOpen} />
          <Outlet />
          <CartModal
            isCartModalOpen={isCartModalOpen}
            onModalClose={handleCartModalClose}
            onAddCartItems={handleAddCartItems}
            onRemoveCartItems={handleRemoveCartItems}
            onUpdateCartItems={handleUpdateCartItems}
          />
        </S.LayoutContainer>
      </ErrorMessageProvider>
    </DataProvider>
  );
};

export default Layout;
