import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const Layout = () => {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.div`
  width: 100%;
  max-width: 429px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;
