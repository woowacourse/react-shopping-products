import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { CartProvider } from '../context/CartContext';
import { useEffect, useState } from 'react';
import tryApiCall from '../util/tryApiCall';
import { getCartItems } from '../services/cartItemServices';
import { CartItemType } from '../types/data';

const Layout = () => {
  const [cartItemsIds, setCartItemsIds] = useState<number[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddCartItemsIds = (id: number) => {
    setCartItemsIds((prev: number[]) => [...prev, id]);
  };

  const handleRemoveCartItemsIds = (id: number) => {
    setCartItemsIds((prev: number[]) => prev.filter((itemId: number) => itemId !== id));
  };

  const handleErrorMessage = (errorMessage: string) => {
    setErrorMessage(errorMessage);
  };

  useEffect(() => {
    (async () => {
      const items = await tryApiCall(getCartItems, handleErrorMessage);
      setCartItemsIds(items.map((item: CartItemType) => item.product.id));
    })();
  }, []);

  return (
    <CartProvider
      cartItemsIds={cartItemsIds}
      errorMessage={errorMessage}
      handleErrorMessage={handleErrorMessage}
      handleAddCartItemsIds={handleAddCartItemsIds}
      handleRemoveCartItemsIds={handleRemoveCartItemsIds}
    >
      <LayoutContainer>
        <Header />
        <Outlet />
      </LayoutContainer>
    </CartProvider>
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
