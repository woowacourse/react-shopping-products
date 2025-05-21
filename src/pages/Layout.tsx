import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { CartProvider } from '../context/CartContext';
import { ErrorMessageProvider } from '../context/ErrorMessageContext';

const Layout = () => {
  return (
    <ErrorMessageProvider>
      <CartProvider>
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
