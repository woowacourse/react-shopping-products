import { Navigation } from '@components/common';

import * as Styled from './AppLayout.styled';

interface AppLayoutProps extends React.PropsWithChildren {
  itemCount: number;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, itemCount }) => {
  return (
    <Styled.AppLayoutWrapper>
      <Navigation itemCount={itemCount} />
      <Styled.LayoutWrapper>{children}</Styled.LayoutWrapper>
    </Styled.AppLayoutWrapper>
  );
};

export default AppLayout;
