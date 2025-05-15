import Header from './Component/Layout/Header';
import ProductListContainer from './Component/Product/ProductListContainer';
import Body from './Component/Layout/Body';
import { useCallback, useEffect, useState } from 'react';
import getShoppingCart from './api/getShoppingCart';
import { CartItemTypes } from './types/CartItemType';
import ErrorBox from './Component/Common/ErrorBox';
import styled from '@emotion/styled';

type Status = 'idle' | 'loading' | 'success' | 'error';

function App() {
  const [cartItems, setCartItems] = useState<CartItemTypes[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState<string[]>([]);

  const updateErrorMessage = useCallback((errorMessage: string) => {
    setErrorMessage((prev) => [...prev, errorMessage]);
  }, []);

  useEffect(() => {
    async function fetchCartItems() {
      try {
        setStatus('loading');
        const cartItemsData = await getShoppingCart();
        setCartItems(cartItemsData.content);
        setStatus('success');
      } catch (e) {
        setStatus('error');
        updateErrorMessage(
          '장바구니 조회 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'
        );
      }
    }
    fetchCartItems();
  }, [updateErrorMessage]);

  const updateCartItems = async () => {
    try {
      const cartItemsData = await getShoppingCart();
      setCartItems(cartItemsData.content);
    } catch (e) {
      //
    } finally {
      //
    }
  };

  const getMatchCartItem = (id: number) => {
    const match = cartItems.find((e) => e.product.id === id);
    return match;
  };

  const checkMax = () => {
    return cartItems.length === 50;
  };

  return (
    <>
      <Header status={status} cartItemCount={cartItems.length} />
      <Body>
        <ProductListContainer
          cartItems={cartItems}
          updateCartItems={updateCartItems}
          getMatchCartItem={getMatchCartItem}
          updateErrorMessage={updateErrorMessage}
          checkMax={checkMax}
        />
      </Body>
      <StyledDiv>
        {errorMessage
          ? errorMessage.map((message) => <ErrorBox>{message}</ErrorBox>)
          : null}
      </StyledDiv>
    </>
  );
}

export default App;

const StyledDiv = styled.div`
  position: absolute;
  width: 100%;
  top: 64px;
  left: 0px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
