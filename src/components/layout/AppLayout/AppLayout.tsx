import * as Styled from './AppLayout.styled';

import { Navigation } from '@components/common';

interface AppLayoutProps extends React.PropsWithChildren {
  itemCount: number;
  cartClick: () => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  itemCount,
  cartClick,
}) => {
  return (
    <Styled.AppLayoutWrapper>
      <Navigation itemCount={itemCount} onCartClick={cartClick} />
      <Styled.LayoutWrapper>{children}</Styled.LayoutWrapper>
    </Styled.AppLayoutWrapper>
  );
};

export default AppLayout;
