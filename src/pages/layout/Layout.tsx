import * as S from './Layout.styles';
import { Outlet } from 'react-router-dom';
import Header from '../../components/header/Header';
import { CartProvider } from '../../context/CartContext';
import { useEffect, useState } from 'react';
import tryApiCall from '../../util/tryApiCall';
import { getCartItems } from '../../services/cartItemServices';
import type { CartItemType } from '../../types/data';
import { ErrorMessageProvider } from '../../context/ErrorMessageContext';

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
    <ErrorMessageProvider errorMessage={errorMessage} handleErrorMessage={handleErrorMessage}>
      <CartProvider
        cartItemsIds={cartItemsIds}
        handleAddCartItemsIds={handleAddCartItemsIds}
        handleRemoveCartItemsIds={handleRemoveCartItemsIds}
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
