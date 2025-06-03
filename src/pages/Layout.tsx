import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { DataProvider } from '../context/DataContext';

const Layout = () => {
  return (
    <DataProvider>
      <LayoutContainer>
        <Header />
        <Outlet />
      </LayoutContainer>
    </DataProvider>
  );
};

export default Layout;

const LayoutContainer = styled.div`
  width: 100%;
  max-width: var(--max-width-container);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;
`;
