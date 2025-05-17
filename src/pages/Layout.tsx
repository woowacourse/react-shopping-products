import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { CartProvider } from '../context/CartContext';
import { useState } from 'react';
import { ErrorMessageProvider } from '../context/ErrorMessageContext';
import useCartHandler from '../hooks/useCartHandler';

const Layout = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleErrorMessage = (errorMessage: string) => {
    setErrorMessage(errorMessage);
  };

  const { cartItemsIds, handleAddCartItemsIds, handleRemoveCartItemsIds } = useCartHandler({
    handleErrorMessage,
  });

  return (
    <ErrorMessageProvider errorMessage={errorMessage} handleErrorMessage={handleErrorMessage}>
      <CartProvider
        cartItemsIds={cartItemsIds}
        handleAddCartItemsIds={handleAddCartItemsIds}
        handleRemoveCartItemsIds={handleRemoveCartItemsIds}
      >
        <LayoutContainer>
          <Header />
          <Outlet />
        </LayoutContainer>
      </CartProvider>
    </ErrorMessageProvider>
  );
};

export default Layout;

const LayoutContainer = styled.div`
  width: 100%;
  max-width: var(--max-width-container);
  display: flex;
  flex-direction: column;
  gap: 36px;
`;
