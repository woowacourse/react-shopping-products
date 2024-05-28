import { Navigation } from '@components/common';

import * as Styled from './AppLayout.styled';

const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Styled.AppLayoutWrapper>
      <Navigation />
      <Styled.LayoutWrapper>{children}</Styled.LayoutWrapper>
    </Styled.AppLayoutWrapper>
  );
};

export default AppLayout;
