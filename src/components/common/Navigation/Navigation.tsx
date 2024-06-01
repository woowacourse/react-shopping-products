import * as Styled from './Navigation.styled';

import { ShoppingCartSvg } from '@assets/svg';

interface NavigationProps extends React.PropsWithChildren {
  itemCount?: number;
}

const Navigation: React.FC<NavigationProps> = ({ itemCount = 0 }) => {
  return (
    <Styled.NavigationContainer>
      <Styled.NavigationWrapper>
        <Styled.NavigationButton>SHOP</Styled.NavigationButton>
        <Styled.NavigationButton style={{ position: 'relative' }} disabled>
          <ShoppingCartSvg />
          {itemCount > 0 && <Styled.Circle>{itemCount}</Styled.Circle>}
        </Styled.NavigationButton>
      </Styled.NavigationWrapper>
    </Styled.NavigationContainer>
  );
};

export default Navigation;
