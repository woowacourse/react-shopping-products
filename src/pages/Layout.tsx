import styled from '@emotion/styled';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <LayoutContainer>{children}</LayoutContainer>;
};

export default Layout;

const LayoutContainer = styled.div`
  width: 100%;
  max-width: 429px;
`;
