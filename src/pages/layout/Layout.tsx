import * as S from './Layout.styles';
import { Outlet } from 'react-router-dom';
import Header from '../../components/header/Header';
import { CartProvider } from '../../context/CartContext';
import { useState } from 'react';
import { ErrorMessageProvider } from '../../context/ErrorMessageContext';
import useCartItems from '../../hooks/useCartItems';

const Layout = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const handleErrorMessage = (errorMessage: string) => {
    setErrorMessage(errorMessage);
  };

  const { cartItems, handleAddCartItems, handleRemoveCartItems, handleUpdateCartItems } =
    useCartItems({
      handleErrorMessage,
    });

  return (
    <ErrorMessageProvider errorMessage={errorMessage} handleErrorMessage={handleErrorMessage}>
      <CartProvider
        cartItems={cartItems}
        handleAddCartItems={handleAddCartItems}
        handleRemoveCartItems={handleRemoveCartItems}
        handleUpdateCartItems={handleUpdateCartItems}
      >
        <S.LayoutContainer>
          <Header />
          <Outlet />
        </S.LayoutContainer>
      </CartProvider>
    </ErrorMessageProvider>
  );
};

export default Layout;
