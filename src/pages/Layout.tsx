import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <LayoutContainer>
      <Outlet />
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.div`
  width: 100%;
  max-width: 429px;
`;
